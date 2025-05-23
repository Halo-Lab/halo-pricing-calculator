import { JSX } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Svg } from "../ui/Svg";
import { Color } from "../palettes/colours";
import { Button } from "../ui/Button";
import { Feature } from "./Feature";
import { LaunchButton } from "./LaunchButton";
import { useBreakpoints } from "../ui/Responsiveness";
import { Box, BoxDecoration } from "../ui/Box";
import { Text, TextDecoration } from "../ui/Text";

import calculatorLottieUrl from "./calculator.lottie";

interface EntryProperties {
  startSurvey: VoidFunction;
}

export function Entry({ startSurvey }: EntryProperties): JSX.Element {
  const { lt, gte, range } = useBreakpoints();

  return (
    <Box
      vertical
      width="fill"
      padding={
        gte(975)
          ? [4.625, 2.75, 2.75]
          : range(525, 975)
            ? [4, 1.5, 1.5, 1.5]
            : [2.5, 1, 1, 1]
      }
      behindContent={
        <Box width="fill" height="fill" vertical>
          <Svg
            width={gte(640) ? 15.125 : gte(450) ? 10 : 7}
            viewBox="0 0 242 32"
            preserveAspectRatio="none"
          >
            <path
              d="M207.03 7.02943L224.971 24.9706C229.472 29.4714 235.576 32 241.941 32H0.000244141V24C0.000244141 10.7452 10.7454 0 24.0002 0H190.059C196.424 0 202.529 2.52856 207.03 7.02943Z"
              fill="#3827C7"
            />
          </Svg>
          <Box
            width="fill"
            height="fill"
            moveUp={0.07}
            decorations={BoxDecoration()
              .backgroundColor("#3827C7")
              .borderTopRightRadius(1)
              .borderBottomRightRadius(1)
              .borderBottomLeftRadius(1)}
          />
        </Box>
      }
    >
      <Box
        width="fill"
        spacing={gte(1250) ? 8 : gte(975) ? 4 : gte(850) ? 3 : 1}
        padding={[0, 0, gte(1280) ? 2.625 : gte(640) ? 2.2 : 1.7, 0]}
      >
        <Text
          alignY="center"
          color={Color.white}
          weight={500}
          size={
            gte(1350)
              ? 4.875
              : gte(1250)
                ? 4.2
                : gte(975)
                  ? 3.7
                  : gte(850)
                    ? 3.3
                    : gte(450)
                      ? 2.7
                      : 2
          }
          spacing={gte(975) ? 0.25 : 0.35}
          maxWidth={53.125}
        >
          Get an{" "}
          <Text
            weight={500}
            size={
              gte(1350)
                ? 4.875
                : gte(1250)
                  ? 4.2
                  : gte(975)
                    ? 3.7
                    : gte(850)
                      ? 3.3
                      : gte(450)
                        ? 2.7
                        : 2
            }
            color={Color.yellow}
          >
            instant
          </Text>{" "}
          <Text
            weight={500}
            size={
              gte(1350)
                ? 4.875
                : gte(1250)
                  ? 4.2
                  : gte(975)
                    ? 3.7
                    : gte(850)
                      ? 3.3
                      : gte(450)
                        ? 2.7
                        : 2
            }
            color={Color.yellow}
          >
            project
          </Text>{" "}
          <Text
            weight={500}
            size={
              gte(1350)
                ? 4.875
                : gte(1250)
                  ? 4.2
                  : gte(975)
                    ? 3.7
                    : gte(850)
                      ? 3.3
                      : gte(450)
                        ? 2.7
                        : 2
            }
            color={Color.yellow}
          >
            estimate
          </Text>{" "}
          with a detailed roadmap and product creation plan*
        </Text>
        {gte(650) && (
          <Box width={15} alignX="end" alignY="center" aspectRatio={0.74}>
            <DotLottieReact src={calculatorLottieUrl} loop autoplay />
          </Box>
        )}
      </Box>

      <Box
        width="fill"
        height={1 / 16}
        decorations={BoxDecoration().backgroundColor(Color.white20)}
      />

      <Box
        width="fill"
        padding={[gte(640) ? 2 : 1.7, 0, 0]}
        vertical={lt(1310)}
        spacing={gte(740) ? 1.6 : 1}
      >
        <Box spacing={gte(1440) ? 3 : gte(640) ? 1.5 : 1} vertical={lt(640)}>
          <Feature>no calls, no delays - just data-driven estimates</Feature>
          <Feature variant="smaller">
            based on our 12 years of b2b expertise
          </Feature>
        </Box>

        <LaunchButton startSurvey={startSurvey} />
      </Box>
    </Box>
  );
}
