import { JSX, PropsWithChildren } from "react";

import { Svg } from "../ui/Svg";
import { Text } from "../ui/Text";
import { Color } from "../palettes/colours";
import { useBreakpoints } from "../ui/Responsiveness";
import { Box, BoxDecoration } from "../ui/Box";

interface FeatureProps extends PropsWithChildren {
  variant?: "smaller";
}

export function Feature({ children, variant }: FeatureProps): JSX.Element {
  const { gte } = useBreakpoints();

  return (
    <Box spacing={gte(740) ? 1.5 : gte(640) ? 1.1 : 0.7}>
      <Box
        width={gte(1040) ? 3.5 : gte(640) ? 2.8 : 2}
        aspectRatio={1}
        decorations={BoxDecoration()
          .backgroundColor(Color.blueDark30)
          .borderRadius(50)}
      >
        {variant === "smaller" ? (
          <Svg
            alignX="center"
            alignY="center"
            width={gte(1040) ? 1.7 : gte(710) ? 1.3 : gte(640) ? 1.1 : 0.8}
            viewBox="0 0 28 28"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.166 2.33301H6.99935C5.71068 2.33301 4.66602 3.37768 4.66602 4.66634V23.333C4.66602 24.6217 5.71068 25.6663 6.99935 25.6663H20.9993C22.288 25.6663 23.3327 24.6217 23.3327 23.333V10.4997L15.166 2.33301Z"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.166 2.33301V10.4997H23.3327"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        ) : (
          <Svg
            alignX="center"
            alignY="center"
            width={gte(1040) ? 1.7 : gte(710) ? 1.3 : gte(640) ? 1.1 : 0.8}
            viewBox="0 0 29 29"
          >
            <path
              d="M25.4994 14.0772V15.1622C25.4965 20.329 22.0954 24.8785 17.1407 26.3434C12.1859 27.8084 6.85771 25.8399 4.04553 21.5055C1.23335 17.171 1.60709 11.5031 4.96407 7.57547C8.32105 3.64781 13.8616 2.396 18.5811 4.49889"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.6673 4.66406L13.834 17.4974L10.334 13.9974"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </Box>
      <Text
        alignY="center"
        size={gte(1040) ? 1.25 : gte(640) ? 1 : 0.85}
        spacing={0.5}
        color={Color.white}
        maxWidth={variant === "smaller" ? 16 : 19.25}
      >
        {children}
      </Text>
    </Box>
  );
}
