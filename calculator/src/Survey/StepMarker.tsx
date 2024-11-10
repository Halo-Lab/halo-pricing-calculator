import { JSX } from "react";

import { Icon } from "../components/icons";
import { Color } from "../palettes/colours";
import { Box, BoxDecoration } from "../ui/Box";

export type MarkerKind = "past" | "current" | "future";

export interface StepMarkerProps {
  step: MarkerKind;
}

const markerColors: Record<MarkerKind, string> = {
  past: Color.green,
  current: Color.homeBlue,
  future: Color.blueDark30,
};

export function StepMarker({ step }: StepMarkerProps): JSX.Element {
  return (
    <Box
      width={1}
      height={1}
      alignY="center"
      decorations={BoxDecoration()
        .borderRadius(999)
        .backgroundColor(markerColors[step])}
    >
      {step === "past" ? (
        <Icon
          alignX="center"
          alignY="center"
          width={0.65}
          height={0.65}
          color={Color.white}
          variant="check"
        />
      ) : (
        <Box
          alignX="center"
          alignY="center"
          width={0.5}
          height={0.5}
          decorations={BoxDecoration()
            .borderRadius(999)
            .backgroundColor(Color.white)}
        />
      )}
    </Box>
  );
}
