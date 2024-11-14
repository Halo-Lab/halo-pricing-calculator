import { useMemo } from "react";

import { Color } from "../palettes/colours";
import { Option } from "../entities/option";
import { Button } from "../ui/Button";
import { useBreakpoints } from "../ui/Responsiveness";
import { RegularQuestion } from "../entities/question";
import { Icon, IconVariant } from "../components/icons";
import { Box, BoxDecoration } from "../ui/Box";
import { Svg, SvgDecoration } from "../ui/Svg";
import { Text, TextDecoration } from "../ui/Text";
import { useDispatch, useSelector } from "../store/Provider";
import { AddAnswer, MoveToNextStep } from "../store/actions";

interface RightCardProperties {
  question: RegularQuestion;
}

export function RightCard({ question }: RightCardProperties): JSX.Element {
  const dispatch = useDispatch();
  const { gte, range } = useBreakpoints();

  const options = useSelector((store) => store.options);

  const platformOptions = useMemo(() => {
    return question.options
      .map((optionReference) => options.get(optionReference))
      .filter((option): option is Option => !!option);
  }, [options, question]);

  return (
    <Box
      vertical
      width={gte(680) ? ".5fr" : "fill"}
      height="fill"
      padding={
        range(525, 680) || gte(975)
          ? [4.5, 2.5, 2.5]
          : range(450, 525) || range(750, 975)
            ? [3.5, 1, 1, 1]
            : [2.5, 1, 1, 1]
      }
      spacing={
        range(425, 680) || gte(875)
          ? 2
          : range(375, 425) || range(700, 875)
            ? 1.5
            : 1.25
      }
      behindContent={
        <Svg
          width="fill"
          height="fill"
          viewBox="0 0 640 528"
          preserveAspectRatio="none"
        >
          <g clipPath="url(#clip0_51293_76948)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M207.029 7.02944C202.529 2.52856 196.424 0 190.059 0H24C10.7452 0 0 10.7452 0 24V32V504C0 517.255 10.7452 528 24 528H445.353H616C629.255 528 640 517.255 640 504V259.543V56C640 42.7452 629.255 32 616 32H241.941C235.576 32 229.471 29.4714 224.971 24.9706L207.029 7.02944Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_51293_76948">
              <rect width="640" height="528" rx="24" fill="white" />
            </clipPath>
          </defs>
        </Svg>
      }
    >
      <Text
        as="h1"
        size={
          range(640, 680) || gte(1370)
            ? 2.75
            : range(575, 640) || range(1270, 1370)
              ? 2.55
              : range(500, 575) || range(950, 975) || range(1175, 1270)
                ? 2.25
                : range(450, 500) || range(900, 950) || range(1100, 1175)
                  ? 2.1
                  : range(425, 450) || range(800, 900) || range(975, 1100)
                    ? 1.85
                    : range(375, 425) || range(750, 800)
                      ? 1.65
                      : range(350, 375) || range(700, 750)
                        ? 1.55
                        : 1.35
        }
        weight={500}
        decorations={
          // remove Webflow's default text-transform for the h1
          TextDecoration().textTransform("none")
        }
      >
        {question.text}
      </Text>

      <Box vertical spacing={1} width="fill">
        {platformOptions.map((option) => {
          return (
            <Button
              name="Platform selector"
              spacing={range(450, 680) || gte(800) ? 1 : 0.7}
              width="fill"
              key={option.id}
              padding={
                range(450, 680) || gte(825)
                  ? 1
                  : range(375, 450) || range(700, 825)
                    ? 0.85
                    : 0.7
              }
              decorations={BoxDecoration()
                .borderRadius(6.25)
                .backgroundColor(Color.greyLight)}
              onPress={() => {
                dispatch(new AddAnswer(option.id));
                dispatch(new MoveToNextStep());
              }}
            >
              <Icon
                color={Color.blue}
                invertColor={Color.white}
                variant={option.icon as IconVariant}
                width={range(375, 680) || gte(750) ? 2.5 : 1.5}
                height={range(375, 680) || gte(750) ? 2.5 : 1.5}
                decorations={SvgDecoration().borderRadius(100)}
              />
              <Text
                size={0.875}
                weight={500}
                spacing={0.5}
                density={1.04375}
                alignY="center"
                decorations={TextDecoration()
                  .flex(1)
                  .textAlign("left")
                  .textTransform("uppercase")
                  .fontFeatureSettings("'liga' off, 'clig' off")}
              >
                {option.text}
              </Text>
              {range(425, 680) || range(925, 975) || gte(1050) ? (
                <Text
                  alignX="end"
                  alignY="center"
                  decorations={[
                    TextDecoration().opacity(0).transitionProperty("opacity"),
                    TextDecoration("hovered")
                      .dependOn("direct-parent")
                      .opacity(0.7),
                  ]}
                >
                  I need it!
                </Text>
              ) : null}
              <Box
                alignX="end"
                alignY="center"
                width={
                  range(700, 750) ? 1.5 : range(375, 680) || gte(750) ? 2 : 1
                }
                height={
                  range(700, 750) ? 1.5 : range(375, 680) || gte(750) ? 2 : 1
                }
                decorations={[
                  BoxDecoration()
                    .borderRadius(100)
                    .transitionProperty("background-color"),
                  BoxDecoration("hovered")
                    .dependOn("direct-parent")
                    .backgroundColor(Color.blueDark),
                ]}
              >
                <Icon
                  width="fill"
                  height="fill"
                  variant="chevron-right"
                  decorations={[
                    SvgDecoration().transitionProperty("color"),
                    SvgDecoration("hovered")
                      .dependOn("Platform selector-parent")
                      .color(Color.white),
                  ]}
                />
              </Box>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
