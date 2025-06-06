import { Store } from "./definition";
import {
  EstimateRange,
  EstimateRangeAssessment,
  EstimationOperationKind,
} from "../entities/estimate";

export function calculateEstimates(
  store: Pick<Store, "answers" | "options" | "questions" | "estimates">,
): [
  EstimateRange,
  Array<{
    summaryLabel: string;
    estimateRange: EstimateRange;
    showOnlyLabel?: boolean;
  }>,
] {
  let totalEstimates: EstimateRange = [0, 0];
  const groupedEstimates: Record<
    string,
    { estimateRange: EstimateRange; showOnlyLabel?: boolean }
  > = {};

  store.answers.forEach((reference) => {
    const option = store.options.get(reference)!;
    const estimateTitle = option.summaryLabel;
    const showOnlyLabel = option.showOnlyLabel;

    const optionEstimate = option.estimates.reduce<EstimateRange>(
      (range, reference) => {
        const assessment = store.estimates.get(reference)!.assessment;

        if (assessment.matches(store.answers)) {
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
        } else {
          return range;
        }
      },
      groupedEstimates[estimateTitle]?.estimateRange ?? [0, 0],
    );

    if (showOnlyLabel) {
      groupedEstimates[estimateTitle] = {
        estimateRange: optionEstimate,
        showOnlyLabel: true,
      };
    } else if (optionEstimate[0] || optionEstimate[1]) {
      groupedEstimates[estimateTitle] = { estimateRange: optionEstimate };
    }

    totalEstimates = option.estimates.reduce<EstimateRange>(
      (range, reference) => {
        const assessment = store.estimates.get(reference)!.assessment;

        if (assessment.matches(store.answers)) {
          return assessment.applyTo(range);
        } else {
          return range;
        }
      },
      totalEstimates,
    );
  });

  return [
    totalEstimates,
    Object.entries(groupedEstimates).map(
      ([summaryLabel, { estimateRange, showOnlyLabel }]) => ({
        summaryLabel,
        estimateRange,
        showOnlyLabel,
      }),
    ),
  ];
}
