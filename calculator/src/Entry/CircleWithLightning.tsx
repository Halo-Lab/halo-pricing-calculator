import { JSX } from "react";

import { Svg } from "../ui/Svg";
import { Color } from "../palettes/colours";
import { useBreakpoints } from "../ui/Responsiveness";
import { Box, BoxDecoration } from "../ui/Box";

interface CircleWithLightningProps {
  buttonHovered: boolean;
  position: "start" | "end";
}

export function CircleWithLightning({
  position,
  buttonHovered,
}: CircleWithLightningProps): JSX.Element {
  const { gte } = useBreakpoints();

  return (
    <Box
      alignX={position}
      minWidth={gte(850) ? 3.125 : gte(690) ? 2.7 : gte(360) ? 3 : 2.4}
      scale={
        buttonHovered
          ? position === "end"
            ? 1
            : 0
          : position === "end"
            ? 0
            : 1
      }
      aspectRatio={1}
      decorations={BoxDecoration()
        .backgroundColor(Color.white)
        .borderRadius(50)
        .transitionDuration(".5s")
        .transitionTimingFunction("cubic-bezier(.215,.61,.355,1)")}
    >
      <Svg
        alignX="center"
        alignY="center"
        width={gte(640) ? 2 : 1.4}
        viewBox="0 0 33 33"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.7337 3.06738L4.40039 19.0674H16.4004L15.0671 29.734L28.4004 13.734H16.4004L17.7337 3.06738Z"
          stroke="#02021E"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Box>
  );
}
