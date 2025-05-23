import { JSX, PropsWithChildren } from "react";

import { Svg } from "../ui/Svg";
import { Color } from "../palettes/colours";
import { useBreakpoints } from "../ui/Responsiveness";
import { Box, BoxDecoration } from "../ui/Box";
import { Text, TextDecoration } from "../ui/Text";

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
        <Svg
          alignX="center"
          alignY="center"
          width={gte(1040) ? 1.5 : gte(640) ? 1.1 : 0.8}
          viewBox="0 0 24 24"
        >
          <path
            d="M10.8251 1H13.0372V10.9932L23.3126 7.70002L24 9.83599L13.7915 13.135L20.088 21.6801L18.2895 23L11.9241 14.4764L5.71395 22.9354L3.87111 21.6569L10.0574 13.2305L0 9.84056L0.652066 7.63607L10.8251 11.0079V1Z"
            fill="white"
          />
        </Svg>
      </Box>
      <Text
        alignY="center"
        size={gte(1040) ? 1.25 : gte(640) ? 1 : 0.85}
        spacing={0.5}
        color={Color.white}
        decorations={TextDecoration().textTransform("uppercase")}
        maxWidth={variant === "smaller" ? 17 : 18.25}
      >
        {children}
      </Text>
    </Box>
  );
}
