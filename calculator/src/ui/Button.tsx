import { JSX, Ref, forwardRef, PointerEventHandler } from "react";

import { extend } from "./Element";
import { Decoration, Opaque } from "./decorations";
import { Box, BoxCSSProperties, BoxProps } from "./Box";

import "./Button.css";

export type ButtonCSSProperties = Opaque<
  Omit<BoxCSSProperties, "">,
  "ButtonCSSProperties"
>;

export const ButtonDecoration = Decoration<ButtonCSSProperties>;

export interface ButtonProps extends Omit<BoxProps<"button">, "as"> {
  onPress?: PointerEventHandler<HTMLButtonElement>;
}

export const Button = forwardRef(
  (
    { onPress, _extend, ...props }: ButtonProps,
    ref?: Ref<HTMLButtonElement>,
  ): JSX.Element => {
    return (
      <Box
        as="button"
        ref={ref}
        _extend={extend(_extend, {
          type() {
            return "button";
          },
          onPointerUp() {
            // React will automatically call this function when element
            // is focused and the Enter is pressed.
            return onPress;
          },
          className(value = "") {
            return `${value} c-button`;
          },
        })}
        {...props}
      />
    );
  },
);
