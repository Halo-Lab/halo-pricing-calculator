import { JSX } from "react";

import { Box } from "../ui/Box";
import { Text } from "../ui/Text";
import { Icon } from "../components/icons";
import { Color } from "../palettes/colours";
import { useBreakpoints } from "../ui/Responsiveness";

export function NoFilesState(): JSX.Element {
  const { lt } = useBreakpoints();

  return (
    <>
      <Icon
        variant="download"
        alignX="center"
        width={3.5}
        height={3.5}
        invertColor={Color.white}
      />
      <Box width="fill" spacing={1.125} vertical>
        <Box alignX="center" spacing={0.2} vertical={lt(375)}>
          <Text weight={500} color={Color.blue}>
            Click to Upload
          </Text>
          <Text weight={500} color={Color.blueDark70}>
            or drag and drop
          </Text>
        </Box>
        <Text alignX="center" size={0.875} color={Color.blueDark70}>
          (*.png *.jpeg *.pdf 15 mb max)
        </Text>
      </Box>
    </>
  );
}
