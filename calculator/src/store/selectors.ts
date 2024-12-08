import { Store } from "./definition";
import { EstimateRange } from "../entities/estimate";
import { RegularQuestion } from "../entities/question";

export function calculateEstimates(
  store: Store,
): [EstimateRange, Array<[string, EstimateRange]>] {
  let totalEstimates: EstimateRange = [0, 0];
  const groupedEstimates: Record<string, EstimateRange> = {};

  store.answers.forEach((reference) => {
    const option = store.options.get(reference)!;
    const question = store.questions.get(option.question)!;

    const groupTitle =
      question instanceof RegularQuestion
        ? (question.optionToGroupMap?.[option.id] ?? question.title)
        : question.title;

    // "void" is a special group which evaporates data assigned to it.
    // Basically it means we do not want to propagate such data.
    // {@see data.ts} file to learn which questions end up there.
    if (groupTitle !== "void") {
      groupedEstimates[groupTitle] = option.estimates.reduce<EstimateRange>(
        (range, reference) =>
          store.estimates.get(reference)!.assessment.applyTo(range),
        groupedEstimates[groupTitle] ?? [0, 0],
      );

      totalEstimates = option.estimates.reduce<EstimateRange>(
        (range, reference) =>
          store.estimates.get(reference)!.assessment.applyTo(range),
        totalEstimates,
      );
    }
  });

  return [totalEstimates, Object.entries(groupedEstimates)];
}
