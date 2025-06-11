import { JSX, useState } from "react";

import { Svg } from "../ui/Svg";
import { Color } from "../palettes/colours";
import { Button } from "../ui/Button";
import { useBreakpoints } from "../ui/Responsiveness";
import { Box, BoxDecoration } from "../ui/Box";
import { Text, TextDecoration } from "../ui/Text";
import { useDebouncedCallback } from "use-debounce";

interface LaunchButtonProps {
  startSurvey: VoidFunction;
}

export function LaunchButton({ startSurvey }: LaunchButtonProps): JSX.Element {
  const { gte } = useBreakpoints();
  const [buttonHovered, setButtonHovered] = useState(false);

  const dispatchButtonHovered = useDebouncedCallback(setButtonHovered, 50);

  return (
    <Button
      alignX={gte(1310) ? "end" : "start"}
      onPress={startSurvey}
      behindContent={
        <Box
          alignX="end"
          width={gte(640) ? 2.8 : 2}
          scale={buttonHovered ? 1 : 0}
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
            width={gte(640) ? 1.5 : 1.1}
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
      }
      _extend={{
        id: "launch-smart-calculator",
        onMouseEnter() {
          dispatchButtonHovered(true);
        },
        onMouseLeave() {
          dispatchButtonHovered(false);
        },
        // Attach this attribute at the end so Webflow can react on it.
        // @ts-expect-error data attributes are added to the extend interface
        "data-hover": "",
      }}
    >
      <Box
        width={gte(640) ? 2.8 : 2}
        scale={buttonHovered ? 0 : 1}
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
          width={gte(640) ? 1.5 : 1.1}
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

      <Box
        padding={[gte(640) ? 1 : 0.75, 1.5]}
        moveLeft={buttonHovered ? (gte(640) ? 2.8 : 2) : 0}
        decorations={BoxDecoration()
          .backgroundColor(Color.yellow)
          .borderRadius(2)
          .transitionDuration(".5s")
          .transitionTimingFunction("cubic-bezier(.215,.61,.355,1)")}
      >
        <Box _extend={{ className: "button__overflow" }}>
          <Box
            width="fill"
            _extend={{
              className: "button__texts",
              // Attach this attribute at the end so Webflow can react on it.
              // @ts-expect-error data attributes are added to the extend interface
              "data-hover-elem": "",
            }}
            decorations={BoxDecoration().transitionDuration(".5s")}
          >
            <Text
              size={gte(640) ? 1 : 0.75}
              weight={500}
              decorations={TextDecoration()
                .textTransform("uppercase")
                .textAlign("center")}
            >
              launch smart calculator
            </Text>
            <Text
              size={gte(640) ? 1 : 0.75}
              weight={500}
              decorations={TextDecoration()
                .textTransform("uppercase")
                .textAlign("center")}
              _extend={{
                className: "button__text is-absolute",
              }}
            >
              launch smart calculator
            </Text>
          </Box>
        </Box>
      </Box>
    </Button>
  );
}
