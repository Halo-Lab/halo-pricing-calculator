import {
  JSX,
  For,
  ref,
  Show,
  memo,
  state,
  Getter,
  Component,
  WithChildren,
} from "moru";

import { Option } from "../../entities/option.js";
import { Question } from "../../entities/question.js";
import { createId } from "../../id.js";
import { PlusIcon } from "./PlusIcon.js";
import { RightAlignedTabBackground } from "../RightAlignedTabBackground.js";
import {
  Estimate,
  EstimateExactAssessment,
  EstimateRangeAssessment,
} from "../../entities/estimate.js";
import {
  useStore,
  AddAnswerEvent,
  RemoveAnswerEvent,
  MoveToNextStepEvent,
  MoveToPreviousStepEvent,
} from "../../store.js";

import "./index.css";

interface SurveyProperties extends QuestionsBlockProperties {}

export const Survey: Component<SurveyProperties> = ({ questions }) => {
  return (
    <>
      <Show when={questions} fallback={<FinalStage />}>
        <QuestionsBlock questions={questions} />
      </Show>
      <ResultsBlock />
    </>
  );
};

/**
 * A speculative email regex.
 * Rules: https://en.wikipedia.org/wiki/Email_address#cite_note-6
 * Test environment: https://regexr.com/7e2oq
 *
 * Regressions:
 * 	1. It allows up to 252 characters in domain part with up to 4 labels where last 3 labels may have up to 62 characters.
 *	2. Does not check if top-level domain exists (obviously).
 *
 * Possible regressions:
 *	1. Does not allow comments in qouted local part.
 */
export const EMAIL_REGEX =
  /^(?:"(?:[^"\\]|\\["\\]){1,62}"|(?:\([^)]*\))?(?:\w|[-!#$%&'*+/=?^`{|}~])(?:\w|[-!#$%&'*+/=?^`{|}~]|\.(?=\w|[-!#$%&'*+/=?^`{|}~])){0,63}(?:\([^)]*\))?)@(?:\([^)]*\))?(?:(?:[a-zA-Z0-9-]){1,63}(?:\.[a-zA-Z0-9-]{1,62}){0,3}|\[(?:\d{3}(?:\.\d{3}){3}|IPv6(?::(?:\d|[A-Fa-f]){4}){8})\])(?:\([^)]*\))?$/;

const FinalStage: Component<{}> = () => {
  const emailId = createId();
  const nameId = createId();

  const [select, dispatch] = useStore();

  const [email, setEmail] = state("");
  const [name, setName] = state("");

  const isEmailInvalid = memo(() => {
    return !EMAIL_REGEX.test(email());
  }, [email]);
  const isNameInvalid = memo(() => {
    return name().length === 0;
  }, [name]);
  const isGettingProposalForbidden = memo(() => {
    return isNameInvalid() || isEmailInvalid();
  }, [isNameInvalid, isEmailInvalid]);

  const shouldShowEmailError = memo(() => {
    return email().length > 0 && isEmailInvalid();
  }, [email]);
  const shouldShowNameError = memo(() => {
    return name().length > 0 && isNameInvalid();
  }, [name]);

  return (
    <TabbedSection
      heading="Receive Estimate"
      showComments={false}
      nextButton={
        <button
          type="button"
          on:click={() => {}}
          disabled={isGettingProposalForbidden}
          data-btn-primary
          data-sliding-text-container
        >
          <span data-sliding-text="get a proposal">get a proposal</span>
        </button>
      }
    >
      <form data-proposal>
        <legend>
          Fill out this form and get your detailed estimate in the email
        </legend>

        <div data-input-container>
          <input
            id={emailId}
            type="email"
            required
            data-invalid={shouldShowEmailError}
            placeholder="ceo@of.company"
            on:input={(event) => setEmail(event.currentTarget.value)}
          />
          <label for={emailId}>
            Email <span data-required>*</span>
          </label>
          <Show when={shouldShowEmailError}>
            <p>Seems like this email is invalid</p>
          </Show>
        </div>
        <div data-input-container>
          <input
            id={nameId}
            type="text"
            required
            data-invalid={shouldShowNameError}
            on:input={(event) => setName(event.currentTarget.value)}
          />
          <label for={nameId}>
            Name<span data-required>*</span>
          </label>
          <Show when={shouldShowNameError}>
            <p>Fill in name please</p>
          </Show>
        </div>
      </form>
    </TabbedSection>
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
      nextButton={
        <button
          type="button"
          on:click={() => dispatch(new MoveToNextStepEvent())}
          disabled={isMovingForwardForbidden}
          data-btn-primary
          data-sliding-text-container
        >
          <span data-sliding-text="next">next</span>
        </button>
      }
    >
      <div data-questions>
        <For each={questions as Getter<Question[]>}>
          {(question) => <QuestionBlock question={question} />}
        </For>
      </div>
    </TabbedSection>
  );
};

interface TabbedSectionProperties extends WithChildren {
  heading: JSX.Element;
  nextButton: JSX.Element;
  showComments: boolean;
}

const TabbedSection: Component<TabbedSectionProperties> = ({
  heading,
  children,
  nextButton,
  showComments,
}) => {
  const [select, dispatch] = useStore();

  const steps = select((store) => store.questionsByStep.length + 1);

  const currentStep = select((store) => store.currentStep + 1);

  return (
    <div>
      <h4>estimation of website</h4>

      <section data-tabbed-section>
        <RightAlignedTabBackground />

        <header>
          <h1>{heading}</h1>
          <span>
            <span data-label>Step:</span>
            <span data-counter>
              {currentStep}/{steps}
            </span>
          </span>
        </header>

        {children}

        <footer>
          <div>
            {showComments ? (
              <button type="button" data-btn-tertiary on:click={console.log}>
                <PlusIcon /> add comment
              </button>
            ) : null}
          </div>
          <button
            type="button"
            on:click={() => {
              dispatch(new MoveToPreviousStepEvent());
            }}
            data-btn-secondary
            data-sliding-text-container
          >
            <span data-sliding-text="back">back</span>
          </button>
          {nextButton}
        </footer>
      </section>
    </div>
  );
};

interface QuestionBlockProperties {
  question: Getter<Question>;
}

const QuestionBlock: Component<QuestionBlockProperties> = ({ question }) => {
  const [select] = useStore();

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

  return (
    <article>
      <h3>{text}</h3>

      <For each={questionOptions}>
        {(option) => <SelectOption option={option} multiple={multiple} />}
      </For>
    </article>
  );
};

interface SelectOptionProperties {
  option: Getter<Option>;
  multiple: Getter<boolean>;
}

const SelectOption: Component<SelectOptionProperties> = ({
  option,
  multiple,
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
  const isSelected = memo(() => answers().has(option().id), [answers, option]);

  return (
    <>
      <input
        id={inputId}
        type={inputType}
        name={name}
        checked={isSelected}
        on:change={(event) => {
          if (event.currentTarget.checked) {
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
      .filter((estimate): estimate is Estimate => !!estimate?.text);
  }, [answers, options]);
  const overallEstimateRange = memo(() => {
    return estimatesOfSelectedOptions().reduce(
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

      <ol ref={listRef} data-expanded={isListExpanded}>
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
