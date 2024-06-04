import { Component, state, memo, Show } from "moru";

import { Button } from "../Button.js";
import { Option } from "../../entities/option.js";
import { Question } from "../../entities/question.js";
import { Reference } from "../../entities/entity.js";
import { Dictionary } from "../../dictionary.js";
import { TabbedSection } from "./TabbedSection.js";
import { SingleLineInput } from "../SingleLineInput.js";
import { useStore, Comment, ResetEvent } from "../../store.js";
import {
  Estimate,
  EstimateExactAssessment,
  EstimateRangeAssessment,
  EstimateApplicationConditionKind,
} from "../../entities/estimate.js";

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

export const FinalStage: Component<{}> = () => {
  const [select, dispatch] = useStore();

  const answers = select((store) => store.answers);
  const options = select((store) => store.options);
  const comments = select((store) => store.comments);
  const estimates = select((store) => store.estimates);
  const questionsByStep = select((store) => store.questionsByStep);

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
      nextButton={() => (
        <Button
          variant="primary"
          disabled={isGettingProposalForbidden}
          on:click={() => {
            const input = document.querySelector<HTMLInputElement>(
              "#input-for-survey-data",
            );
            const submit = document.querySelector<
              HTMLButtonElement | HTMLInputElement
            >("#proposal-submit");

            if (input && submit) {
              input.value = createEmailContent({
                name: name(),
                email: email(),
                answers: answers(),
                options: options(),
                comments: comments(),
                estimates: estimates(),
                questionsByStep: questionsByStep(),
              });

              submit.click();

              dispatch(new ResetEvent());
            }
          }}
        >
          get a proposal
        </Button>
      )}
    >
      <form data-proposal>
        <legend>
          Fill out this form and get your detailed estimate in the email
        </legend>

        <div data-input-container>
          <SingleLineInput
            type="email"
            label="Email"
            required
            prop:value={email}
            on:input={(event) => setEmail(event.currentTarget.value)}
          />
          <Show when={shouldShowEmailError}>
            <p>Seems like this email is invalid</p>
          </Show>
        </div>
        <div data-input-container>
          <SingleLineInput
            type="text"
            label="Name"
            required
            prop:value={name}
            on:input={(event) => setName(event.currentTarget.value)}
          />
          <Show when={shouldShowNameError}>
            <p>Fill in name please</p>
          </Show>
        </div>
      </form>
    </TabbedSection>
  );
};

interface EmailContentSource {
  name: string;
  email: string;
  answers: Set<Reference<Option>>;
  options: Dictionary<Option>;
  comments: Comment[];
  estimates: Dictionary<Estimate>;
  questionsByStep: Question[][];
}

function createEmailContent({
  name,
  email,
  answers,
  options,
  comments,
  estimates,
  questionsByStep,
}: EmailContentSource): string {
  let totalMinDays = 0;
  let totalMaxDays = 0;

  const stepsWithAnswers = questionsByStep.map((questions, index) => {
    const answeredQuestions = questions.map((question, index) => {
      const questionAnswers = question.options
        .filter((optionReference) => answers.has(optionReference))
        .map((optionReference) => options.get(optionReference))
        .filter((option): option is Option => Boolean(option))
        .map((option) => {
          const [minDays, maxDays] = option.estimates
            .filter((estimateReference) => {
              const estimate = estimates.get(estimateReference);

              if (!estimate) return false;

              if (estimate.assessment.applicable) {
                switch (estimate.assessment.applicable.kind) {
                  case EstimateApplicationConditionKind.Or:
                    return estimate.assessment.applicable.chosenOptions.some(
                      (optionReference) => answers.has(optionReference),
                    );
                  case EstimateApplicationConditionKind.And:
                    return estimate.assessment.applicable.chosenOptions.every(
                      (optionReference) => answers.has(optionReference),
                    );
                }
              } else {
                return true;
              }
            })
            .reduce(
              (accumulator: [number, number], estimateReference) => {
                const estimate = estimates.get(estimateReference)!;

                if (estimate.assessment instanceof EstimateExactAssessment) {
                  const days = Math.ceil(estimate.assessment.hours / 8);
                  accumulator[0] += days;
                  totalMinDays += days;

                  accumulator[1] += days;
                  totalMaxDays += days;
                } else if (
                  estimate.assessment instanceof EstimateRangeAssessment
                ) {
                  const minDays = Math.ceil(estimate.assessment.minHours / 8);
                  accumulator[0] += minDays;
                  totalMinDays += minDays;

                  const maxDays = Math.ceil(estimate.assessment.maxHours / 8);
                  accumulator[1] += maxDays;
                  totalMaxDays += maxDays;
                }

                return accumulator;
              },
              [0, 0],
            );

          const workTime = rangeToString(minDays, maxDays);

          return `    - ${option.text} (${workTime})`;
        })
        .join("\n");

      return `  ${index + 1}: ${question.text}\n${questionAnswers}`;
    });

    const comment = comments.find((comment) => comment.step === index);

    const commentSection = comment ? `  Comment: ${comment.text}\n\n` : "\n";

    return `Step ${index + 1}.\n${answeredQuestions}\n${commentSection}`;
  });

  const totalEstimate = rangeToString(totalMinDays, totalMaxDays);

  return `
Name: ${name}
Email: ${email}

Answers:
${stepsWithAnswers}
Total estimate: ${totalEstimate}
`;
}

function rangeToString(minDays: number, maxDays: number): string {
  return minDays === maxDays
    ? minDays === 1
      ? "1 day"
      : `${minDays} days`
    : `${minDays}-${maxDays} days`;
}
