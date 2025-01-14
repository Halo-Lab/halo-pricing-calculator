import { JSX } from "react";

import { Icon } from "../components/icons";
import { Color } from "../palettes/colours";
import { SvgDecoration } from "../ui/Svg";
import { Text, TextDecoration } from "../ui/Text";
import { Button, ButtonDecoration, ButtonProps } from "../ui/Button";

interface SmallFileUploadZoneProps
  extends Omit<
    ButtonProps,
    "width" | "height" | "spacing" | "decorations" | "_extend"
  > {}

export function SmallFileUploadZone(
  props: SmallFileUploadZoneProps,
): JSX.Element {
  return (
    <Button
      width={6.875}
      height={6.875}
      spacing={0.625}
      padding={[1.25, 0.75]}
      vertical
      decorations={[
        ButtonDecoration()
          .backgroundColor(Color.greyLight)
          .borderRadius(1)
          .transitionDuration(".3s")
          .borderWidth(0.0625)
          .borderStyle("dashed")
          .borderColor(Color.blueDark30),
        ButtonDecoration("hovered").borderColor(Color.blueDark),
        ButtonDecoration("dragging-over-drop-zone")
          .dependOn("any-parent")
          .borderColor(Color.blueDark),
      ]}
      {...props}
    >
      <Icon
        width={3}
        height={3}
        moveDown={0.625}
        variant="plus"
        alignX="center"
        invertColor={Color.white}
        decorations={[
          SvgDecoration().transitionDuration(".3s"),
          SvgDecoration("hovered")
            .dependOn("direct-parent")
            ["--c-translate-y"](0),
          SvgDecoration("dragging-over-drop-zone")
            .dependOn("any-parent")
            ["--c-translate-y"](0),
        ]}
      />
      <Text
        alignX="center"
        size={0.875}
        weight={500}
        decorations={[
          TextDecoration().transitionDuration(".3s").opacity(0),
          TextDecoration("hovered").dependOn("direct-parent").opacity(1),
          TextDecoration("dragging-over-drop-zone")
            .dependOn("any-parent")
            .opacity(1),
        ]}
      >
        Add screens
      </Text>
    </Button>
  );
}
