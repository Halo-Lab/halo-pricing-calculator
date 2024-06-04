import { For, ref, Show, memo, state, Getter, Component, effect } from "moru";

import { Option } from "../../entities/option.js";
import { Question } from "../../entities/question.js";
import { createId } from "../../id.js";
import { PlusIcon } from "./PlusIcon.js";
import { FinalStage } from "./FinalStage.js";
import { TabbedSection } from "./TabbedSection.js";
import {
  Estimate,
  EstimateExactAssessment,
  EstimateRangeAssessment,
  EstimateApplicationConditionKind,
} from "../../entities/estimate.js";
import {
  useStore,
  AddAnswerEvent,
  AddCommentEvent,
  RemoveAnswerEvent,
  MoveToNextStepEvent,
} from "../../store.js";

import "./index.css";
import { Button } from "../Button.js";

interface SurveyProperties {
  questions: Getter<Question[] | undefined>;
}

export const Survey: Component<SurveyProperties> = ({ questions }) => {
  return (
    <>
      <Show when={questions} fallback={<FinalStage />}>
        <QuestionsBlock questions={questions as Getter<Question[]>} />
      </Show>
      <ResultsBlock />
    </>
  );
};

interface QuestionsBlockProperties {
  questions: Getter<Question[]>;
}

const QuestionsBlock: Component<QuestionsBlockProperties> = ({ questions }) => {
  const [select, dispatch] = useStore();

  const answers = select(
    (store) => store.answers,
    () => false,
  );

  const title = memo(() => {
    return questions(
      (questions) => questions.find((question) => question.title)?.title,
    );
  }, [questions]);

  const isMovingForwardForbidden = memo(() => {
    return !questions((questions) =>
      questions?.every((question) => {
        return question.options.some((optionReference) =>
          answers().has(optionReference),
        );
      }),
    );
  }, [answers, questions]);

  return (
    <TabbedSection
      heading={title}
      showComments
      nextButton={(comment) => (
        <Button
          on:click={() => {
            const commentText = comment();

            if (commentText) {
              dispatch(new AddCommentEvent(commentText));
            }

            dispatch(new MoveToNextStepEvent());
          }}
          disabled={isMovingForwardForbidden}
          variant="primary"
        >
          next
        </Button>
      )}
    >
      <div data-questions>
        <For each={questions}>
          {(question) => <QuestionBlock question={question} />}
        </For>
      </div>
    </TabbedSection>
  );
};

interface QuestionBlockProperties {
  question: Getter<Question>;
}

const QuestionBlock: Component<QuestionBlockProperties> = ({ question }) => {
  const [select, dispatch] = useStore();

  const options = select((store) => store.options);

  const questionOptions = memo(() => {
    return question()
      .options.map((optionReference) => options().get(optionReference))
      .filter((option): option is Option => !!option);
  }, [options, question]);

  const text = memo(() => {
    return question().text;
  }, [question]);
  const multiple = memo(() => {
    return question().multiple;
  }, [question]);

  const deselectAllOptions = (): void => {
    question().options.forEach((optionReference) =>
      dispatch(new RemoveAnswerEvent(optionReference)),
    );
  };

  return (
    <article>
      <h3>{text}</h3>

      <For each={questionOptions}>
        {(option) => (
          <SelectOption
            option={option}
            multiple={multiple}
            deselectAllOptions={deselectAllOptions}
          />
        )}
      </For>
    </article>
  );
};

interface SelectOptionProperties {
  option: Getter<Option>;
  multiple: Getter<boolean>;
  deselectAllOptions(): void;
}

const SelectOption: Component<SelectOptionProperties> = ({
  option,
  multiple,
  deselectAllOptions,
}) => {
  const inputId = createId();

  const [select, dispatch] = useStore();

  const answers = select(
    (store) => store.answers,
    () => false,
  );

  const inputType = memo(() => {
    return multiple() ? "checkbox" : "radio";
  }, [multiple]);
  const text = memo(() => {
    return option().text;
  }, [option]);
  const name = memo(() => {
    return inputType() === "radio" ? "answer" : "";
  }, [inputType]);
  const isSelected = memo(() => {
    return answers().has(option().id);
  }, [answers, option]);

  return (
    <>
      <input
        id={inputId}
        type={inputType}
        name={name}
        prop:checked={isSelected}
        on:change={(event) => {
          if (event.currentTarget.checked) {
            if (!multiple()) {
              deselectAllOptions();
            }

            dispatch(new AddAnswerEvent(option().id));
          } else {
            dispatch(new RemoveAnswerEvent(option().id));
          }
        }}
      />
      <label for={inputId}>{text}</label>
    </>
  );
};

const ResultsBlock: Component<{}> = () => {
  const listRef = ref<HTMLOListElement>();

  const [isListExpanded, setIsListExpanded] = state(false);

  const [select] = useStore();

  const options = select((store) => store.options);
  const answers = select(
    (store) => store.answers,
    () => false,
  );
  const estimates = select((store) => store.estimates);
  const estimatesOfSelectedOptions = memo(() => {
    return Array.from(answers())
      .map((optionReference) => options().get(optionReference))
      .flatMap((option) => {
        return option?.estimates.map((estimateReference) =>
          estimates().get(estimateReference),
        );
      })
      .filter((estimate): estimate is Estimate => !!estimate?.text)
      .filter((estimate) => {
        if (estimate.assessment.applicable) {
          switch (estimate.assessment.applicable.kind) {
            case EstimateApplicationConditionKind.Or:
              return estimate.assessment.applicable.chosenOptions.some(
                (optionReference) =>
                  answers((values) => values.has(optionReference)),
              );
            case EstimateApplicationConditionKind.And:
              return estimate.assessment.applicable.chosenOptions.every(
                (optionReference) =>
                  answers((values) => values.has(optionReference)),
              );
          }
        } else {
          return true;
        }
      });
  }, [answers, options]);
  const overallEstimateRange = memo(() => {
    return estimatesOfSelectedOptions((estimates) => {
      return estimates.reduce(
        (accumulator: [number, number], estimate) => {
          if (estimate.assessment instanceof EstimateExactAssessment) {
            accumulator[0] += estimate.assessment.hours;
            accumulator[1] += estimate.assessment.hours;
          } else if (estimate.assessment instanceof EstimateRangeAssessment) {
            accumulator[0] += estimate.assessment.minHours;
            accumulator[1] += estimate.assessment.maxHours;
          }

          return accumulator;
        },
        [0, 0],
      );
    });
  }, [estimatesOfSelectedOptions]);
  const overallMinimalDays = memo(() => {
    return Math.ceil(overallEstimateRange()[0] / 8);
  }, [overallEstimateRange]);
  const overallMaximumDays = memo(() => {
    return Math.ceil(overallEstimateRange()[1] / 8);
  }, [overallEstimateRange]);

  return (
    <section data-results>
      <header>
        <h2>Summary</h2>

        <button
          type="button"
          on:click={() => {
            setIsListExpanded((value) => !value);
          }}
        >
          <PlusIcon isMinus={isListExpanded} />
        </button>
      </header>

      <ol
        ref={listRef}
        data-expanded={isListExpanded}
        class="scroll-style-light"
      >
        <For each={estimatesOfSelectedOptions}>
          {(estimate) => <EstimateRow estimate={estimate} />}
        </For>
      </ol>

      <footer>
        Total:
        <span>
          {overallMinimalDays}-{overallMaximumDays} days
        </span>
      </footer>
    </section>
  );
};

interface EstimateRowProperties {
  estimate: Getter<Estimate>;
}

const EstimateRow: Component<EstimateRowProperties> = ({ estimate }) => {
  const text = memo(() => estimate().text, [estimate]);
  const estimatedDuration = memo(
    () => estimate().assessment.toString(),
    [estimate],
  );

  return (
    <li>
      <span>{text}</span> <span>{estimatedDuration}</span>
    </li>
  );
};
