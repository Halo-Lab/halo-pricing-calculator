import { JSX, PropsWithChildren } from "react";

import { Color } from "../palettes/colours";
import { Box, BoxProps } from "../ui/Box";
import { useBreakpoints } from "../ui/Responsiveness";
import { Text, TextDecoration } from "../ui/Text";
import { StepMarker, StepMarkerProps } from "./StepMarker";

export interface QuestionGroupLabelProps
  extends StepMarkerProps,
    PropsWithChildren,
    Omit<BoxProps, "spacing"> {}

export function QuestionGroupLabel({
  step,
  children,
  ...props
}: QuestionGroupLabelProps): JSX.Element {
  const { gte } = useBreakpoints();

  const color =
    step === "future"
      ? Color.blueDark30
      : step === "past"
        ? Color.blueDark
        : gte(1100)
          ? Color.homeBlue
          : Color.blueDark;

  return (
    <Box spacing={0.5} {...props}>
      <StepMarker step={step} />
      <Text
        size={gte(1100) ? 0.875 : 1.125}
        weight={500}
        density={0.98}
        spacing={0.3}
        alignY="center"
        color={color}
        decorations={TextDecoration().flex(1)}
      >
        {children}
      </Text>
    </Box>
  );
}
