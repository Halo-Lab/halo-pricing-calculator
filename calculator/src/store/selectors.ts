import { Store } from "./definition";
import {
  EstimateRange,
  EstimateRangeAssessment,
  EstimationOperationKind,
} from "../entities/estimate";

export function calculateEstimates(
  store: Pick<Store, "answers" | "options" | "questions" | "estimates">,
): [EstimateRange, Array<[string, EstimateRange]>] {
  let totalEstimates: EstimateRange = [0, 0];
  const groupedEstimates: Record<string, EstimateRange> = {};

  store.answers.forEach((reference) => {
    const option = store.options.get(reference)!;

    const estimateTitle = option.summaryLabel;

    const optionEstimate = option.estimates.reduce<EstimateRange>(
      (range, reference) => {
        const assessment = store.estimates.get(reference)!.assessment;

        if (
          assessment.operationKind === EstimationOperationKind.Multiplication
        ) {
          const currentRange =
            !range[0] || !range[1]
              ? new EstimateRangeAssessment(
                  totalEstimates[0],
                  totalEstimates[1],
                ).applyTo(range)
              : range;

          const nextRange = assessment.applyTo(currentRange);

          return [
            nextRange[0] - currentRange[0],
            nextRange[1] - currentRange[1],
          ];
        } else {
          return assessment.applyTo(range);
        }
      },
      groupedEstimates[estimateTitle] ?? [0, 0],
    );

    // Create a summary entry when there is non-zero estimate.
    if (optionEstimate[0] || optionEstimate[1]) {
      groupedEstimates[estimateTitle] = optionEstimate;
    }

    totalEstimates = option.estimates.reduce<EstimateRange>(
      (range, reference) =>
        store.estimates.get(reference)!.assessment.applyTo(range),
      totalEstimates,
    );
  });

  return [totalEstimates, Object.entries(groupedEstimates)];
}
