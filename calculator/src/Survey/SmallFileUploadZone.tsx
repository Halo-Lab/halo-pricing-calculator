import { JSX, useState } from "react";

import { Icon } from "../components/icons";
import { Color } from "../palettes/colours";
import { SvgDecoration } from "../ui/Svg";
import { Text, TextDecoration } from "../ui/Text";
import { Button, ButtonDecoration, ButtonProps } from "../ui/Button";

interface SmallFileUploadZoneProps
  extends Omit<
    ButtonProps,
    "width" | "height" | "spacing" | "decorations" | "_extend"
  > {
  isDragging: boolean;
}

export function SmallFileUploadZone({
  isDragging,
  ...props
}: SmallFileUploadZoneProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

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
          .transitionDuration(".24s")
          .borderWidth(0.0625)
          .borderStyle("dashed")
          .borderColor(isDragging ? Color.blueDark : Color.blueDark30),
        ButtonDecoration("hovered").borderColor(Color.blueDark),
      ]}
      _extend={{
        onPointerEnter() {
          setIsHovered(true);
        },
        onPointerLeave() {
          setIsHovered(false);
        },
      }}
      {...props}
    >
      <Icon
        width={3}
        height={3}
        moveDown={isHovered || isDragging ? 0 : 0.625}
        variant="plus"
        alignX="center"
        invertColor={Color.white}
        decorations={SvgDecoration().transitionDuration(".24s")}
      />
      <Text
        alignX="center"
        size={0.875}
        weight={500}
        decorations={[
          TextDecoration().transitionDuration(".24s").opacity(0),
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
