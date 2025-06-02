import { JSX, useMemo } from "react";

import { Icon } from "../components/icons";
import { Text } from "../ui/Text";
import { Color } from "../palettes/colours";
import { useSelector } from "../store/Provider";
import { useBreakpoints } from "../ui/Responsiveness";
import { displayDuration } from "../utilities/duration";
import { Box, BoxDecoration } from "../ui/Box";
import { calculateEstimates } from "../store/selectors";
import { spreadElementsAcrossColumns } from "./spreadElementsAcrossColumns";

interface SummaryProps {}

export function Summary({}: SummaryProps): JSX.Element {
  const { gte, range } = useBreakpoints();

  const options = useSelector((store) => store.options);
  const answers = useSelector((store) => store.answers);
  const estimates = useSelector((store) => store.estimates);
  const questions = useSelector((store) => store.questions);
  const currentStep = useSelector((store) => store.currentStep + 1);
  const [totalEstimates, groupedEstimates]: [
    number[],
    Array<{
      summaryLabel: string;
      estimateRange: number[];
      showOnlyLabel?: boolean;
    }>,
  ] = useMemo(
    () =>
      calculateEstimates({
        options,
        answers,
        estimates,
        questions,
      }),
    [options, answers, estimates, questions],
  );

  const resultElements = useMemo(
    () =>
      groupedEstimates.map(({ summaryLabel, estimateRange, showOnlyLabel }) => {
        const [from, to] = estimateRange;
        if (showOnlyLabel) {
          return (
            <Box key={summaryLabel} spacing={0.5} width="fill">
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
                {summaryLabel}
              </Text>
            </Box>
          );
        }
        return (
          <Box key={summaryLabel} spacing={0.5} width="fill">
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
              {summaryLabel}
            </Text>
            <Text
              alignY="center"
              size={gte(425) ? 1 : 0.75}
              alignX="end"
              color={Color.white70}
              breaking="forbid"
            >
              {displayDuration(from, to)}
            </Text>
          </Box>
        );
      }),
    [groupedEstimates, gte(425)],
  );

  const gridElements = useMemo(() => {
    if (range(680, 1100)) {
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
    }
  }, [resultElements, range(680, 1100)]);

  const totalEstimatesText = useMemo(() => {
    if (totalEstimates[0] || totalEstimates[1]) {
      return displayDuration(totalEstimates[0], totalEstimates[1]);
    } else {
      return "Add details to see!";
    }
  }, [totalEstimates]);

  return (
    <Box
      vertical
      width={gte(1200) ? ".29fr" : range(1100, 1200) ? ".3fr" : "fill"}
      padding={gte(1100) ? undefined : range(450, 1100) ? 2.5 : 1}
      spacing={gte(1100) ? 1 : range(680, 1100) ? 2 : 1.5}
      _extend={{ style: { display: currentStep > 2 ? "flex" : "none" } }}
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
            {gridElements}
          </Box>
        ) : (
          <Box vertical width="fill" spacing={gte(1100) ? 0.75 : 0.5}>
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
            {totalEstimatesText}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
