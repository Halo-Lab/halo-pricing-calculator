import { Autoplay } from "swiper/modules";
import { JSX, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Svg } from "../ui/Svg";
import { Text } from "../ui/Text";
import { Color } from "../palettes/colours";
import { Feature } from "./Feature";
import { LaunchButton } from "./LaunchButton";
import { useBreakpoints } from "../ui/Responsiveness";
import { Box, BoxDecoration } from "../ui/Box";

// import calculatorLottieUrl from "./calculator.lottie";
import calculatorVideoUrl from "./calculator.webm";

interface EntryProperties {
  startSurvey: VoidFunction;
}

export function Entry({ startSurvey }: EntryProperties): JSX.Element {
  const { lt, gte, range } = useBreakpoints();

  const titleFontSize = gte(1610)
    ? 5.625
    : gte(1440)
      ? 5.1
      : gte(1350)
        ? 4.875
        : gte(1250)
          ? 4.2
          : gte(975)
            ? 3.7
            : gte(850)
              ? 3.3
              : gte(600)
                ? 2.5
                : gte(450)
                  ? 2
                  : 1.5;

  const highlightedWordExtendedProp = useMemo(() => {
    return {
      "data-launch-calculator-id": "launch-smart-calculator",
      onClick: startSurvey,
      style: {
        cursor: "pointer",
      },
    };
  }, [startSurvey]);

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
        spacing={
          gte(1780) ? 5 : gte(1250) ? 6 : gte(975) ? 4 : gte(850) ? 3 : 1
        }
        padding={[0, 0, gte(1280) ? 2.625 : gte(640) ? 2.2 : 1.7, 0]}
      >
        <Text
          alignY="center"
          color={Color.white}
          weight={500}
          size={titleFontSize}
          spacing={gte(975) ? 0.25 : 0.35}
          width={gte(650) ? "0.755fr" : undefined}
        >
          Get an{" "}
          <Text
            weight={500}
            size={titleFontSize}
            color={Color.yellow}
            _extend={highlightedWordExtendedProp}
          >
            instant
          </Text>{" "}
          <Text
            weight={500}
            size={titleFontSize}
            color={Color.yellow}
            _extend={highlightedWordExtendedProp}
          >
            project
          </Text>{" "}
          <Text
            weight={500}
            size={titleFontSize}
            color={Color.yellow}
            _extend={highlightedWordExtendedProp}
          >
            estimate
          </Text>{" "}
          with a detailed roadmap and product creation plan{" "}
          <Text
            weight={500}
            size={titleFontSize}
            color={Color.yellow}
            _extend={highlightedWordExtendedProp}
          >
            in
          </Text>{" "}
          <Text
            weight={500}
            size={titleFontSize}
            color={Color.yellow}
            _extend={highlightedWordExtendedProp}
          >
            a
          </Text>{" "}
          <Text
            weight={500}
            size={titleFontSize}
            color={Color.yellow}
            _extend={highlightedWordExtendedProp}
          >
            few
          </Text>{" "}
          <Text
            weight={500}
            size={titleFontSize}
            color={Color.yellow}
            _extend={highlightedWordExtendedProp}
          >
            clicks
          </Text>
        </Text>
        {gte(650) && (
          <Box
            width={"0.195fr"}
            alignX="end"
            alignY="center"
            aspectRatio={0.74}
          >
            {/* <DotLottieReact
              src={new URL(
                calculatorLottieUrl,
                import.meta.env.VITE_PUBLIC_ASSETS_URL,
              ).toString()}
              loop
              autoplay
            /> */}
            <video
              src={new URL(
                calculatorVideoUrl,
                import.meta.env.VITE_PUBLIC_ASSETS_URL,
              ).toString()}
              width="100%"
              loop
              autoPlay
              // It is required by Chrome.
              muted
            />
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
        vertical={lt(690)}
        spacing={gte(740) ? 1.6 : 1}
      >
        {gte(1350) ? (
          <Box spacing={gte(1440) ? 3 : 1.5}>
            <Feature variant="smaller">
              No calls, no delays - just data-driven estimates
            </Feature>
            <Feature>
              Based on 500+ finished projects &amp; 12 years of b2b expertise
            </Feature>
          </Box>
        ) : (
          <Swiper
            loop
            autoplay
            direction="vertical"
            modules={[Autoplay]}
            // spaceBetween={gte(1440) ? 48 : gte(640) ? 24 : 16}
            style={{
              height: gte(1040) ? 60 : 50,
              overflow: "hidden",
            }}
          >
            <SwiperSlide>
              <Feature variant="smaller">
                No calls, no delays - just data-driven estimates
              </Feature>
            </SwiperSlide>
            <SwiperSlide>
              <Feature>
                Based on 500+ finished projects &amp; 12 years of b2b expertise
              </Feature>
            </SwiperSlide>
          </Swiper>
        )}

        <LaunchButton startSurvey={startSurvey} />
      </Box>
    </Box>
  );
}
