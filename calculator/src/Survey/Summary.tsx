import { JSX } from "react";

import { Icon } from "../components/icons";
import { Text } from "../ui/Text";
import { Color } from "../palettes/colours";
import { useSelector } from "../store/Provider";
import { useBreakpoints } from "../ui/Responsiveness";
import { Box, BoxDecoration } from "../ui/Box";
import { Estimate, EstimateRange } from "../entities/estimate";
import { spreadElementsAcrossColumns } from "./spreadElementsAcrossColumns";

interface SummaryProps {
  shouldRestrictHeight: boolean;
}

export function Summary({ shouldRestrictHeight }: SummaryProps): JSX.Element {
  const { gte, range } = useBreakpoints();
  const groupedEstimates = useSelector((store) => {
    const groupedEstimates: Record<string, EstimateRange> = {};

    store.answers.forEach((reference) => {
      const option = store.options.get(reference)!;
      const question = store.questions.get(option.question)!;

      const range = option.estimates.reduce<EstimateRange>(
        (range, reference) =>
          store.estimates.get(reference)!.assessment.applyTo(range),
        groupedEstimates[question.title] ?? [0, 0],
      );

      groupedEstimates[question.title] = range;
    });

    return Object.entries(groupedEstimates);
  });

  const resultElements = groupedEstimates.map(([title, [from, to]]) => {
    const daysText = `${from === to ? Estimate.toDays(from) : `${Estimate.toDays(from)}-${Estimate.toDays(to)}`} days`;

    return (
      <Box key={title} spacing={0.5} width="fill">
        <Icon
          alignY="center"
          variant="check"
          color={Color.white}
          width={1}
          height={1}
        />
        <Text
          spacing={0.3}
          alignY="center"
          size={gte(425) ? 1 : 0.75}
          color={Color.white}
        >
          {title}
        </Text>
        <Text
          alignY="center"
          size={gte(425) ? 1 : 0.75}
          alignX="end"
          color={Color.white70}
          breaking="forbid"
        >
          {daysText}
        </Text>
      </Box>
    );
  });

  return (
    <Box
      vertical
      width={gte(1200) ? ".275fr" : range(1100, 1200) ? ".3fr" : "fill"}
      padding={gte(1100) ? 2 : range(450, 1100) ? 2.5 : 1}
      spacing={gte(680) ? 1.5 : 1}
      decorations={BoxDecoration()
        .borderRadius(1)
        .backgroundColor(Color.homeBlue)}
    >
      <Text
        size={gte(1100) ? 2.125 : range(680, 1100) ? 1.875 : 1.5}
        weight={500}
        density={0.97}
        color={Color.white}
      >
        Summary
      </Text>

      {range(680, 1100) ? (
        <Box width="fill" spacing={3}>
          {(() => {
            const [firstColumn, secondColumn] =
              spreadElementsAcrossColumns(resultElements);

            return (
              <>
                <Box vertical spacing={1} width=".5fr">
                  {firstColumn}
                </Box>
                <Box
                  width={0.0625}
                  height="fill"
                  decorations={BoxDecoration().backgroundColor(Color.white30)}
                />
                <Box vertical spacing={1} width=".5fr">
                  {secondColumn}
                </Box>
              </>
            );
          })()}
        </Box>
      ) : (
        <Box
          vertical
          width="fill"
          maxHeight={shouldRestrictHeight ? 4.75 : undefined}
          clipY={shouldRestrictHeight ? "scrollable" : undefined}
          spacing={gte(1100) ? 0.75 : 0.5}
        >
          {resultElements}
        </Box>
      )}
    </Box>
  );
}
