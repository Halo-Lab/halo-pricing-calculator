import { Store } from "../store/definition";
import { Option } from "../entities/option";
import { daysText } from "../utilities/daysText";
import { Reference } from "../entities/entity";
import { calculateEstimates } from "../store/selectors";
import { Question, RegularQuestion } from "../entities/question";

export function fillWebflowModalForm(store: Store): void {
  const form = getForm();

  if (form) {
    const hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", "prompt");
    hiddenInput.setAttribute("value", generatePrompt(store));
    form.append(hiddenInput);
  }
}

function getForm(): HTMLFormElement | null | undefined {
  return document
    .querySelector('[data-remodal-id="calculator"]')
    ?.querySelector("form");
}

function generatePrompt(store: Store): string {
  const firstQuestion = store.questionsSequence[0] as RegularQuestion;
  const selectedApplicationTypeOptionReference = firstQuestion.options.find(
    (reference) => store.answers.has(reference),
  );
  const selectedOptionForFirstQuestion = store.options.get(
    selectedApplicationTypeOptionReference!,
  )!;

  const groups = groupQuestionsBasedOnAnswers(store);
  const [totalEstimates, groupedEstimates] = calculateEstimates(store);

  return (
    "I want to build a " +
    selectedOptionForFirstQuestion.text +
    ". " +
    "I went through Halo Lab's survey and selected features I want to see in the " +
    selectedOptionForFirstQuestion.text +
    ". " +
    "These features are grouped and each group has a list of <Question>: <comma-separated answers> rows.\n\n" +
    Object.entries(groups)
      .map(([title, questions]) => {
        return (
          `"${title}" group:\n` +
          Object.entries(questions)
            .map(([reference, answers], index) => {
              const question = store.questions.get(
                reference as Reference<Question>,
              )!;

              return `    ${index + 1}. ${question.text}: ${answers.map((option) => option.text).join(", ")}`;
            })
            .join("\n")
        );
      })
      .join("\n") +
    "\n\nA summary of declared estimates is the following:\n" +
    groupedEstimates
      .map(
        ([title, range], index) =>
          `${index + 1}. ${title} - ${daysText(range[0], range[1])}`,
      )
      .join("\n") +
    `\n\nThe total estimate is ${daysText(totalEstimates[0], totalEstimates[1])}`
  );
}

function groupQuestionsBasedOnAnswers(
  store: Store,
): Record<string, Record<Reference<Question>, Array<Option>>> {
  const groups: Record<string, Record<Reference<Question>, Array<Option>>> = {};

  store.answers.forEach((reference) => {
    const option = store.options.get(reference)!;
    const question = store.questions.get(option.question)!;

    const title =
      question instanceof RegularQuestion
        ? (question.optionToGroupMap?.[reference] ?? question.title)
        : question.title;

    groups[title] ??= {};
    groups[title][question.id] ??= [];
    groups[title][question.id].push(option);
  });

  return groups;
}
