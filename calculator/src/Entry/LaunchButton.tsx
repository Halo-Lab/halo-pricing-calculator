import { JSX, useState } from "react";

import { Color } from "../palettes/colours";
import { Button } from "../ui/Button";
import { useBreakpoints } from "../ui/Responsiveness";
import { Box, BoxDecoration } from "../ui/Box";
import { Text, TextDecoration } from "../ui/Text";
import { useDebouncedCallback } from "use-debounce";
import { CircleWithLightning } from "./CircleWithLightning";

interface LaunchButtonProps {
  startSurvey: VoidFunction;
}

export function LaunchButton({ startSurvey }: LaunchButtonProps): JSX.Element {
  const { gte } = useBreakpoints();
  const [buttonHovered, setButtonHovered] = useState(false);

  const dispatchButtonHovered = useDebouncedCallback(setButtonHovered, 50);

  return (
    <Button
      width={gte(690) ? undefined : "fill"}
      alignX={gte(690) ? "end" : "start"}
      onPress={startSurvey}
      behindContent={
        <CircleWithLightning position="end" buttonHovered={buttonHovered} />
      }
      _extend={{
        onMouseEnter() {
          dispatchButtonHovered(true);
        },
        onMouseLeave() {
          dispatchButtonHovered(false);
        },
        id: "launch-smart-calculator-3",
        // @ts-expect-error
        // Attach this attribute at the end so Webflow can react on it.
        "data-hover": "",
      }}
    >
      <CircleWithLightning position="start" buttonHovered={buttonHovered} />

      <Box
        width={gte(690) ? undefined : "fill"}
        padding={[
          gte(850) ? 1.2 : gte(690) ? 1 : gte(360) ? 1.2 : 0.9,
          gte(850) ? 2.1 : gte(690) ? 1.8 : gte(480) ? 2.1 : 1.5,
        ]}
        moveLeft={buttonHovered ? (gte(640) ? 3.125 : 2.4) : 0}
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
              alignX="center"
              size={gte(850) ? 1 : gte(690) ? 0.75 : gte(640) ? 1 : 0.75}
              weight={500}
              decorations={TextDecoration()
                .textTransform("uppercase")
                .textAlign("center")}
            >
              launch smart calculator
            </Text>
            <Text
              alignX="center"
              size={gte(850) ? 1 : gte(690) ? 0.75 : gte(640) ? 1 : 0.75}
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
