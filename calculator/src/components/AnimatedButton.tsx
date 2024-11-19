import { JSX } from "react";

import { Box } from "../ui/Box";
import { Color } from "../palettes/colours";
import { extend } from "../ui/Element";
import { useBreakpoints } from "../ui/Responsiveness";
import { Text, TextDecoration } from "../ui/Text";
import { Button, ButtonDecoration, ButtonProps } from "../ui/Button";

export type ButtonVariant = "primary" | "secondary-light";

interface ButtonProperties
  extends Omit<ButtonProps, "padding" | "decorations"> {
  variant: ButtonVariant;
}

export function AnimatedButton({
  variant,
  children,
  _extend,
  ...props
}: ButtonProperties): JSX.Element {
  const { gte } = useBreakpoints();

  return (
    <Button
      padding={[0.875, 1.25]}
      decorations={ButtonDecoration()
        .borderWidth(0.0625)
        .borderColor(
          variant === "secondary-light" ? Color.blueDark30 : "currentColor",
        )
        .backgroundColor(variant === "primary" ? Color.blue : undefined)
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
      <Box width="fill" _extend={{ className: "button__overflow" }}>
        <Box
          width="fill"
          _extend={{
            className: "button__texts",
            // Attach this attribute at the end so Webflow can react on it.
            // @ts-expect-error data attributes are added to the extend interface
            "data-hover-elem": "",
          }}
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
    </Button>
  );
}
