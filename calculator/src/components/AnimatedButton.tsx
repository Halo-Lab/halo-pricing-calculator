import { JSX } from "react";

import { Color } from "../palettes/colours";
import { extend } from "../ui/Element";
import { useBreakpoints } from "../ui/Responsiveness";
import { Box, BoxDecoration } from "../ui/Box";
import { Text, TextDecoration } from "../ui/Text";
import { Button, ButtonDecoration, ButtonProps } from "../ui/Button";

export type ButtonVariant = "primary" | "secondary-light";

interface AnimatedButtonProperties extends Omit<ButtonProps, "decorations"> {
  icon?: JSX.Element;
  variant: ButtonVariant;
  disabled?: boolean;
}

export function AnimatedButton({
  icon,
  variant,
  children,
  disabled,
  padding,
  _extend,
  ...props
}: AnimatedButtonProperties): JSX.Element {
  const { gte } = useBreakpoints();

  return (
    <Button
      padding={padding ?? [0.875, 1.25]}
      decorations={ButtonDecoration()
        .borderWidth(0.0625)
        .borderColor(
          variant === "secondary-light" ? Color.blueDark30 : "currentColor",
        )
        .backgroundColor(variant === "primary" ? Color.blue : undefined)
        .opacity(disabled ? 0.3 : undefined)
        .borderRadius(6.25)}
      _extend={extend(_extend, {
        // Attach this attribute at the end so Webflow can react on it.
        // @ts-expect-error data attributes are added to the extend interface
        "data-hover"() {
          return "";
        },
      })}
      {...props}
    >
      <Box
        alignY="center"
        width="fill"
        _extend={{ className: "button__overflow" }}
      >
        <Box
          width="fill"
          _extend={{
            className: "button__texts",
            // Attach this attribute at the end so Webflow can react on it.
            // @ts-expect-error data attributes are added to the extend interface
            "data-hover-elem": "",
          }}
          decorations={BoxDecoration().transitionDuration(".3s")}
        >
          <Text
            size={gte(900) ? 0.875 : 0.75}
            weight={500}
            alignX="center"
            color={variant === "primary" ? Color.white : undefined}
            decorations={TextDecoration().textTransform("uppercase")}
            _extend={{
              className: "button__text",
            }}
          >
            {children}
          </Text>
          <Text
            size={gte(900) ? 0.875 : 0.75}
            weight={500}
            alignX="center"
            color={variant === "primary" ? Color.white : undefined}
            decorations={TextDecoration().textTransform("uppercase")}
            _extend={{
              className: "button__text is-absolute",
            }}
          >
            {children}
          </Text>
        </Box>
      </Box>
      {icon}
    </Button>
  );
}
