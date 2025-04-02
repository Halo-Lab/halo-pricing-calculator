import { Reference } from "../entities/entity";
import { Option } from "../entities/option";
import { Question } from "../entities/question";
import { Store } from "../store/definition";

export function groupQuestionsBasedOnAnswers(
  store: Store,
): Record<string, Record<Reference<Question>, Array<Option>>> {
  const groups: Record<string, Record<Reference<Question>, Array<Option>>> = {};

  store.answers.forEach((reference) => {
    const option = store.options.get(reference)!;
    const question = store.questions.get(option.question)!;

    const title = question.title;

    groups[title] ??= {};
    groups[title][question.id] ??= [];
    groups[title][question.id].push(option);
  });

  return groups;
}
