import { JSX } from "react";

import { Icon } from "../components/icons";
import { Text } from "../ui/Text";
import { Color } from "../palettes/colours";
import { useSelector } from "../store/Provider";
import { useBreakpoints } from "../ui/Responsiveness";
import { RegularQuestion } from "../entities/question";
import { Box, BoxDecoration } from "../ui/Box";
import { Estimate, EstimateRange } from "../entities/estimate";
import { spreadElementsAcrossColumns } from "./spreadElementsAcrossColumns";

interface SummaryProps {
  shouldRestrictHeight: boolean;
}

export function Summary({ shouldRestrictHeight }: SummaryProps): JSX.Element {
  const { gte, range } = useBreakpoints();
  const [totalEstimates, groupedEstimates] = useSelector((store) => {
    let totalEstimates: EstimateRange = [0, 0];
    const groupedEstimates: Record<string, EstimateRange> = {};

    store.answers.forEach((reference) => {
      const option = store.options.get(reference)!;
      const question = store.questions.get(option.question)!;

      const groupTitle =
        question instanceof RegularQuestion
          ? (question.optionToGroupMap?.[option.id] ?? question.title)
          : question.title;

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
    });

    return [totalEstimates, Object.entries(groupedEstimates)];
  });

  const resultElements = groupedEstimates.map(([title, [from, to]]) => {
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
          {daysText(from, to)}
        </Text>
      </Box>
    );
  });

  return (
    <Box
      vertical
      width={gte(1200) ? ".275fr" : range(1100, 1200) ? ".3fr" : "fill"}
      padding={gte(1100) ? undefined : range(450, 1100) ? 2.5 : 1}
      spacing={gte(1100) ? 1 : range(680, 1100) ? 2 : 1.5}
      decorations={
        gte(1100)
          ? undefined
          : BoxDecoration().borderRadius(1).backgroundColor(Color.homeBlue)
      }
    >
      <Box
        vertical
        width="fill"
        spacing={gte(680) ? 1.5 : 1}
        padding={gte(1100) ? 2 : undefined}
        decorations={
          gte(1100)
            ? BoxDecoration().borderRadius(1).backgroundColor(Color.homeBlue)
            : undefined
        }
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

      <Box
        vertical
        width="fill"
        padding={gte(1100) ? 2 : undefined}
        spacing={gte(1100) ? undefined : range(680, 1100) ? 1.875 : 1}
        decorations={
          gte(1100)
            ? BoxDecoration().borderRadius(1).backgroundColor(Color.white)
            : undefined
        }
      >
        {gte(1100) ? null : (
          <Box
            height={0.0625}
            width="fill"
            decorations={BoxDecoration().backgroundColor(Color.white30)}
          />
        )}
        <Box width="fill">
          <Text
            alignY="center"
            size={gte(1100) ? 1.5 : range(680, 1100) ? 1 : 0.75}
            weight={gte(1100) ? 500 : undefined}
            density={gte(1100) ? 0.97 : undefined}
            color={gte(1100) ? Color.blueDark : Color.white}
          >
            Total:
          </Text>
          <Text
            size={gte(680) ? 1.5 : 1.125}
            weight={500}
            density={gte(680) ? 0.97 : 0.9775}
            alignX="end"
            color={gte(1100) ? Color.homeBlue : Color.yellow}
          >
            {daysText(totalEstimates[0], totalEstimates[1])}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

function daysText(from: number, to: number): string {
  return `${from === to ? Estimate.toDays(from) : `${Estimate.toDays(from)}-${Estimate.toDays(to)}`} days`;
}
