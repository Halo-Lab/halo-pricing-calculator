import {
  Ref,
  JSX,
  forwardRef,
  AllHTMLAttributes,
  ChangeEventHandler,
} from "react";

import { extend } from "./Element";
import { Text, TextProps } from "./Text";
import { Decoration, Opaque } from "./decorations";
import { Box, BoxCSSProperties, BoxProps } from "./Box";

import "./Input.css";

export type InputCSSProperties = Opaque<
  Omit<BoxCSSProperties, "">,
  "InputCSSProperties"
>;

export const InputDecoration = Decoration<InputCSSProperties>;

export type InputProps = Omit<BoxProps<"label">, "as"> &
  Omit<
    TextProps<"input">,
    "as" | "_extend" | "autoComplete" | "decorations"
  > & {
    hint?: AllHTMLAttributes<HTMLInputElement>["autoComplete"];
    type: "text" | "email" | "password" | "search";
    value: string;
    required?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    multiline?: boolean;
    placeholder?: string;
    _extendUnderlyingInput?: AllHTMLAttributes<HTMLInputElement>;
  };

export const Input = forwardRef(
  (
    {
      type,
      hint,
      value,
      onChange,
      children,
      required,
      multiline,
      placeholder,
      size,
      color,
      weight,
      family,
      spacing,
      density,
      breaking,
      realHeightRatio,
      sideOffsetCorrection,
      _extendUnderlyingInput,
      // for the outer Box
      decorations,
      _extend,
      ...props
    }: InputProps,
    ref?: Ref<HTMLInputElement | HTMLTextAreaElement>,
  ): JSX.Element => {
    if (Array.isArray(decorations)) {
      decorations.forEach((decoration) => {
        if (decoration.state) {
          decoration.dependOn("direct-children");
        }
      });
    } else if (decorations?.state) {
      decorations!.dependOn("direct-children");
    }

    return (
      <Box
        as="label"
        decorations={decorations}
        _extend={extend(_extend, {
          className(value = "") {
            return `${value} c-input`;
          },
        })}
        {...props}
      >
        {children}
        <Text
          as={multiline ? "textarea" : "input"}
          ref={ref}
          size={size}
          color={color}
          weight={weight}
          family={family}
          spacing={spacing}
          density={density}
          breaking={breaking}
          realHeightRatio={realHeightRatio}
          sideOffsetCorrection={sideOffsetCorrection}
          _extend={extend(_extendUnderlyingInput, {
            value() {
              return value;
            },
            onChange() {
              return onChange;
            },
            required() {
              return required;
            },
            readOnly() {
              return !onChange;
            },
            autoComplete() {
              return hint;
            },
            placeholder() {
              return placeholder;
            },
          })}
        />
      </Box>
    );
  },
);
