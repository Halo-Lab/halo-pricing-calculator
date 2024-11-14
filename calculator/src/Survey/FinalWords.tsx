import { JSX } from "react";

import { Svg } from "../ui/Svg";
import { Text } from "../ui/Text";
import { Color } from "../palettes/colours";
import { useBreakpoints } from "../ui/Responsiveness";
import { groupElementsBy } from "./groupElementsBy";
import { Box, BoxDecoration } from "../ui/Box";
import { CTACard, CTACardData } from "./CTACard";

const ctaCards: Array<CTACardData> = [
  {
    text: "In a hurry? Book a call and we’ll discuss your project right away!",
    mainIcon: "halo-logo",
    interactiveElementText: "book a call",
    interactiveElementIcon: "calendar",
    interactiveElementDataAttributes: {
      "data-remodal-id": "booking",
    },
  },
  {
    text: "Stay ahead of the game! Sign up for our blog’s tips and advice.",
    mainIcon: "stars",
    interactiveElementText: "subscribe",
    interactiveElementIcon: "open-book",
    interactiveElementDataAttributes: {
      "data-remodal-id": "subscribe",
    },
  },
  {
    text: " If you want to know the latest news, connect with us on LinkedIn!",
    mainIcon: "linkedin",
    interactiveElementText: "follow us",
    interactiveElementIcon: "heart",
    interactiveElementLink: "https://www.linkedin.com/company/halolabteam/",
  },
];

export function FinalWords(): JSX.Element {
  const { lt, gte, range } = useBreakpoints();

  return (
    <Box
      behindContent={
        <Box
          width="fill"
          height="fill"
          inFront={
            <Box
              width="fill"
              height={`1fr - ${gte(1400) ? 3 : range(730, 1400) ? 2 : range(500, 730) ? 1.5 : range(350, 500) ? 1 : 0.625}`}
              moveDown={
                gte(1400)
                  ? 3
                  : range(730, 1400)
                    ? 2
                    : range(500, 730)
                      ? 1.5
                      : range(350, 500)
                        ? 1
                        : 0.625
              }
              decorations={BoxDecoration()
                .backgroundColor(Color.white)
                .borderRadius(2)}
            />
          }
        >
          <Svg width="fill" viewBox="0 0 928 95">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M208.029 7.02944C203.529 2.52856 197.424 0 191.059 0H24C10.7452 0 0 10.7452 0 24V32V71C0 84.2548 10.7452 95 24 95H904C917.255 95 928 84.2548 928 71V56C928 42.7452 917.255 32 904 32H242.941C236.576 32 230.471 29.4714 225.971 24.9706L208.029 7.02944Z"
              fill="white"
            />
          </Svg>
        </Box>
      }
      vertical
      width={gte(1200) ? ".725fr" : range(1100, 1200) ? ".7fr" : "fill"}
      spacing={2}
      padding={
        gte(425)
          ? [5, 2.5, 2.5]
          : range(375, 425)
            ? [3, 1.5, 1.5]
            : [2, 1, 1, 1]
      }
    >
      <Text
        size={gte(525) ? 2.75 : 1.75}
        weight={500}
        spacing={0.5}
        density={0.945}
      >
        Thanks! We’ll send the estimate to your email shortly.
      </Text>

      <Box
        width="fill"
        vertical={lt(920) || range(1100, 1200)}
        spacing={lt(725) ? 1 : 2}
      >
        {range(625, 920) || range(1100, 1200)
          ? groupElementsBy(ctaCards, 2).map((group, index) => (
              <Box key={index} alignX="center" spacing={gte(725) ? 2 : 1}>
                {group.map(renderCTACard)}
              </Box>
            ))
          : ctaCards.map(renderCTACard)}
      </Box>
    </Box>
  );
}

function renderCTACard(data: CTACardData, key: number): JSX.Element {
  return <CTACard key={key} {...data} />;
}
