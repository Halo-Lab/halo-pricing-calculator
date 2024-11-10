import { JSX } from "react";

import { Color } from "../palettes/colours";
import { useBreakpoints } from "../ui/Responsiveness";
import { Text, TextDecoration } from "../ui/Text";
import { Box, BoxDecoration, BoxProps } from "../ui/Box";

export interface ProgressChipProps
  extends Omit<BoxProps, "padding" | "spacing" | "decorations"> {
  current: number;
  total: number;
}

export function ProgressChip({
  current,
  total,
  ...props
}: ProgressChipProps): JSX.Element {
  const { gte } = useBreakpoints();

  return (
    <Box
      padding={gte(1050) ? undefined : [0.5, 0.75]}
      spacing={0.2}
      decorations={
        gte(1050)
          ? undefined
          : BoxDecoration()
              .borderRadius(62.5)
              .backgroundColor(Color.antiFlashWhite)
      }
      {...props}
    >
      <Text
        color={Color.blueDark}
        weight={500}
        size={gte(1050) ? 0.875 : 0.75}
        density={gte(1050) ? 1.04375 : 1.0375}
        decorations={TextDecoration().fontFeatureSettings(
          "'liga' off, 'clig' off",
        )}
      >
        {current}
      </Text>
      <Text
        color={Color.blueDark30}
        weight={500}
        size={gte(1050) ? 0.875 : 0.75}
        density={gte(1050) ? 1.04375 : 1.0375}
        decorations={TextDecoration().fontFeatureSettings(
          "'liga' off, 'clig' off",
        )}
      >
        /
      </Text>
      <Text
        color={Color.blueDark30}
        weight={500}
        size={gte(1050) ? 0.875 : 0.75}
        density={gte(1050) ? 1.04375 : 1.0375}
        decorations={TextDecoration().fontFeatureSettings(
          "'liga' off, 'clig' off",
        )}
      >
        {total}
      </Text>
    </Box>
  );
}
