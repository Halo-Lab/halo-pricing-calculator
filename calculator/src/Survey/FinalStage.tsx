import { JSX, useState, useMemo } from "react";

import { Button } from "../components/Button";
import { Option } from "../entities/option";
import { Question } from "../entities/question";
import { Reference } from "../entities/entity";
import { Dictionary } from "../dictionary";
import { TabbedSection } from "./TabbedSection";
import { SingleLineInput } from "../components/SingleLineInput";
import { Comment, useSelector, useDispatch, ResetStore } from "../Store";
import { Estimate, EstimateRange } from "../entities/estimate";

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
const EMAIL_REGEX =
  /^(?:"(?:[^"\\]|\\["\\]){1,62}"|(?:\([^)]*\))?(?:\w|[-!#$%&'*+\/=?^`{|}~])(?:\w|[-!#$%&'*+\/=?^`{|}~]|\.(?=\w|[-!#$%&'*+\/=?^`{|}~])){0,63}(?:\([^)]*\))?)@(?:\([^)]*\))?(?:[a-zA-Z0-9-]{1,63}(?:\.[a-zA-Z0-9-]{1,62}){0,3}|\[(?:\d{3}(?:\.\d{3}){3}|IPv6(?::(?:\d|[A-Fa-f]){4}){8})])(?:\([^)]*\))?$/;

export function FinalStage(): JSX.Element {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const isEmailInvalid = useMemo(() => {
    return !EMAIL_REGEX.test(email);
  }, [email]);

  const isNameInvalid = useMemo(() => {
    return name.length === 0;
  }, [name]);

  const isGettingProposalForbidden = useMemo(() => {
    return isNameInvalid || isEmailInvalid;
  }, [isNameInvalid, isEmailInvalid]);

  const shouldShowEmailError = useMemo(() => {
    return email.length > 0 && isEmailInvalid;
  }, [email]);

  const shouldShowNameError = useMemo(() => {
    return name.length > 0 && isNameInvalid;
  }, [name]);

  return (
    <TabbedSection
      heading="Receive Estimate"
      showComments={false}
      nextButton={() => (
        <Button
          variant="primary"
          disabled={isGettingProposalForbidden}
          onClick={() => {
            const input = document.querySelector<HTMLInputElement>(
              "#input-for-survey-data",
            );
            const submit = document.querySelector<
              HTMLButtonElement | HTMLInputElement
            >("#submit-survey-data");

            if (input && submit) {
              input.value = createEmailContent({
                name: name,
                email: email,
                answers: store.answers,
                options: store.options,
                comments: store.comments,
                estimates: store.estimates,
                questionsByStep: store.questionsSequence,
              });

              submit.click();

              dispatch(new ResetStore());
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
            value={email}
            onInput={(value) => setEmail(value)}
          />
          {shouldShowEmailError && <p>Seems like this email is invalid</p>}
        </div>
        <div data-input-container>
          <SingleLineInput
            type="text"
            label="Name"
            required
            value={name}
            onInput={(value) => setName(value)}
          />
          {shouldShowNameError && <p>Fill in name please</p>}
        </div>
      </form>
    </TabbedSection>
  );
}

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
  let totalMinHours = 0;
  let totalMaxHours = 0;

  const stepsWithAnswers = questionsByStep
    .map((questions, index) => {
      const answeredQuestions = questions
        .map((question, index) => {
          const questionAnswers = question.options
            .filter((optionReference) => answers.has(optionReference))
            .map((optionReference) => options.get(optionReference))
            .filter((option): option is Option => Boolean(option))
            .map((option) => {
              const [minHours, maxHours] = option.estimates
                .filter((estimateReference) => {
                  return estimates
                    .get(estimateReference)
                    ?.assessment.matches(answers);
                })
                .reduce(
                  (accumulator: EstimateRange, estimateReference) => {
                    const estimate = estimates.get(estimateReference)!;

                    [totalMinHours, totalMaxHours] =
                      estimate.assessment.applyTo([
                        totalMinHours,
                        totalMaxHours,
                      ]);

                    return estimate.assessment.applyTo(accumulator);
                  },
                  [0, 0],
                );

              const workTime = hoursRangeToString(minHours, maxHours);

              return `    - ${option.text} (${workTime})`;
            })
            .join("\n");

          return `  ${index + 1}: ${question.text}\n${questionAnswers}`;
        })
        .join("");

      const comment = comments.find((comment) => comment.step === index);

      const commentSection = comment ? `  Comment: ${comment.text}\n\n` : "\n";

      return `Step ${index + 1}.\n${answeredQuestions}\n${commentSection}`;
    })
    .join("\n");

  const totalEstimate = hoursRangeToString(totalMinHours, totalMaxHours);

  return `
Name: ${name}
Email: ${email}

Answers:
${stepsWithAnswers}
Total estimate: ${totalEstimate}
`;
}

function hoursRangeToString(minHours: number, maxHours: number): string {
  const minDays = Estimate.toDays(minHours);
  const maxDays = Estimate.toDays(maxHours);

  return minDays === maxDays
    ? minDays === 1
      ? "1 day"
      : `${minDays} days`
    : `${minDays}-${maxDays} days`;
}
