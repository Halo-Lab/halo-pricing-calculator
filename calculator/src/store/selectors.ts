import { Store } from "./definition";
import { Option } from "../entities/option";
import { Reference } from "../entities/entity";
import {
  Estimate,
  EstimateRange,
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
  const totalEstimates: EstimateRange = [0, 0];

  const answerEstimates: Record<
    Reference<Option>,
    {
      summaryLabel: string;
      estimateRange: EstimateRange;
      showOnlyLabel?: boolean;
    }
  > = {};

  for (const optionReference of store.answers) {
    const option = store.options.get(optionReference)!;

    const estimateRange: EstimateRange = option.estimates
      .map((estimateReference) => {
        return store.estimates.get(estimateReference);
      })
      .filter((estimate): estimate is Estimate => {
        return estimate?.assessment.matches(store.answers) ?? false;
      })
      .reduce(
        (accumulator, estimate) => {
          if (
            estimate.assessment.operationKind ===
            EstimationOperationKind.Multiplication
          ) {
            const startingRange =
              estimate.assessment.target
                ?.map((optionReference) => {
                  return store.options.get(optionReference);
                })
                .filter((option): option is Option => {
                  return option ? option.id in answerEstimates : false;
                })
                .reduce(
                  (accumulator: EstimateRange, option) => {
                    const { estimateRange } = answerEstimates[option.id];

                    return [
                      accumulator[0] + estimateRange[0],
                      accumulator[1] + estimateRange[1],
                    ] satisfies EstimateRange;
                  },
                  [0, 0],
                ) ?? totalEstimates;

            const nextRange = estimate.assessment.applyTo(startingRange);

            return [
              nextRange[0] - startingRange[0],
              nextRange[1] - startingRange[1],
            ];
          } else {
            return estimate.assessment.applyTo(accumulator);
          }
        },
        [0, 0],
      );

    answerEstimates[option.id] = {
      estimateRange,
      summaryLabel: option.summaryLabel,
      showOnlyLabel: option.showOnlyLabel,
    };

    totalEstimates[0] += estimateRange[0];
    totalEstimates[1] += estimateRange[1];
  }

  return [
    totalEstimates,
    Object.values(answerEstimates).filter(({ estimateRange }) => {
      return estimateRange[0] || estimateRange[1];
    }),
  ];
}
