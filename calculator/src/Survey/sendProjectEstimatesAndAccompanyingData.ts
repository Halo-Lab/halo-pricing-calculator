import { Reference } from "../entities/entity";
import { EstimateRange } from "../entities/estimate";
import { calculateEstimates } from "../store/selectors";
import { Question, RegularQuestion } from "../entities/question";
import { ProjectFileAcceptance, Store } from "../store/definition";
import { groupQuestionsBasedOnAnswers } from "./fillWebflowModalForm";

export async function sendProjectEstimatesAndAccompanyingData(
  store: Store,
): Promise<void> {
  const form = getForm();

  if (form) {
    const name =
      form.querySelector<HTMLInputElement>("#Calculator-Name")!.value;
    const email =
      form.querySelector<HTMLInputElement>("#Calculator-email")!.value;
    const phone = form.querySelector<HTMLInputElement>(
      '[name="phone_full"]',
    )!.value;
    const countryCode = form.querySelector<HTMLInputElement>(
      '[name="country_code"]',
    )!.value;

    /**
     * The content is going to be:
     *
     * ```ts
     * {
     *   name: string,
     *   email: string,
     *   phone: string,
     *   countryCode: string,
     *   questionnaire: string, // Stringified {@link QuestionnaireResults} object.
     *   files?: Array<File>,
     *   description?: string,
     * }
     * ```
     */
    const body = new FormData();

    body.set("name", name);
    body.set("email", email);
    body.set("phone", phone);
    body.set("countryCode", countryCode);
    body.set("questionnaire", prepareQuestionnaireResults(store));
    store.projectFiles
      ?.filter((file) => file.acceptance === ProjectFileAcceptance.Accepted)
      .forEach((file) => body.append("files", file.original));
    if (store.projectDescription) {
      body.set("description", store.projectDescription);
    }

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/srs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body,
      },
    );

    if (response.ok) {
      // Everything is good, we can definitely show final frame with CTAs.
    } else {
      // ?
    }
  } // else should not happen
}

function getForm(): HTMLFormElement | null | undefined {
  return document
    .querySelector('[data-remodal-id="calculator"]')
    ?.querySelector("form");
}

interface EstimatedOption {
  text: string;
}

interface EstimatedQuestion {
  text: string;
  selectedOptions: Array<EstimatedOption>;
}

interface QuestionGroup {
  title: string;
  questions: Array<EstimatedQuestion>;
  totalEstimate: EstimateRange;
}

interface QuestionnaireResults {
  projectType: string;
  totalEstimate: EstimateRange;
  questionGroups: Array<QuestionGroup>;
}

function prepareQuestionnaireResults(store: Store): string {
  const firstQuestion = store.questionsSequence[0] as RegularQuestion;
  const selectedApplicationTypeOptionReference = firstQuestion.options.find(
    (reference) => store.answers.has(reference),
  );
  const selectedOptionForFirstQuestion = store.options.get(
    selectedApplicationTypeOptionReference!,
  )!;
  const groups = groupQuestionsBasedOnAnswers(store);
  const [totalEstimate, groupedEstimates] = calculateEstimates(store);

  const results: QuestionnaireResults = {
    projectType: selectedOptionForFirstQuestion.text,
    totalEstimate,
    questionGroups: [],
  };

  for (const groupTitle in groups) {
    const [, groupEstimate] = groupedEstimates.find(
      ([title]) => title === groupTitle,
    )!;

    const answeredQuestions = Object.entries(groups[groupTitle]).map(
      ([questionReference, selectedOptions]): EstimatedQuestion => {
        const question = store.questions.get(
          questionReference as Reference<Question>,
        )!;
        const estimatedOptions = selectedOptions.map(
          (option): EstimatedOption => {
            return { text: option.text };
          },
        );

        return {
          text: question.text,
          selectedOptions: estimatedOptions,
        };
      },
    );

    results.questionGroups.push({
      title: groupTitle,
      questions: answeredQuestions,
      totalEstimate: groupEstimate,
    });
  }

  return JSON.stringify(results);
}