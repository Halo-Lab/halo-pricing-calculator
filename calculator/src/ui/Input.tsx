import {
  Ref,
  JSX,
  forwardRef,
  AllHTMLAttributes,
  FocusEventHandler,
  ChangeEventHandler,
} from "react";

import { units } from "./measurements";
import { Decoration, Opaque } from "./decorations";
import { Element, ElementCSSProperties, ElementProps, extend } from "./Element";

import "./Input.css";

export type InputCSSProperties = Opaque<
  Omit<
    ElementCSSProperties,
    | "color"
    | "font"
    | "fontFamily"
    | "fontWeight"
    | "fontSize"
    | "lineHeight"
    | "letterSpacing"
  >,
  "InputCSSProperties"
>;

export const InputDecoration = Decoration<InputCSSProperties>;

export interface InputCommonProps
  extends Omit<ElementProps<InputCSSProperties>, "as" | "vertical"> {
  hint?: AllHTMLAttributes<HTMLInputElement>["autoComplete"];
  value: string;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onFocusLost?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  size?: number;
  color?: ElementCSSProperties["color"];
  weight?: number;
  family?: string;
  spacing?: number;
  density?: ElementCSSProperties["letterSpacing"];
  realHeightRatio?: number;
}

export interface OneLineInputProps extends InputCommonProps {
  type: "text" | "email" | "password";
  rows?: undefined;
  multiline?: false;
}

export interface MultiLineInputProps extends InputCommonProps {
  type: "text";
  rows?: number;
  multiline: true;
}

export type InputProps = OneLineInputProps | MultiLineInputProps;

export const Input = forwardRef(
  (
    {
      multiline,
      rows,
      type,
      hint,
      value,
      required,
      onChange,
      onFocus,
      onFocusLost,
      placeholder,
      size = 1,
      color,
      weight,
      family,
      spacing = 0,
      density,
      realHeightRatio = 0.74,
      _extend,
      ...props
    }: InputProps,
    ref?: Ref<HTMLInputElement | HTMLTextAreaElement>,
  ): JSX.Element => {
    return (
      <Element
        as={multiline ? "textarea" : "input"}
        ref={ref}
        _extend={extend(_extend, {
          className(value = "") {
            return `${value} c-input`;
          },
          type() {
            return type;
          },
          autoComplete() {
            return hint;
          },
          required() {
            return required;
          },
          readOnly() {
            return !onChange;
          },
          onChange() {
            return onChange;
          },
          onFocus() {
            return onFocus;
          },
          onBlur() {
            return onFocusLost;
          },
          placeholder() {
            return placeholder;
          },
          rows() {
            return rows;
          },
          style(style = {}) {
            return {
              ...style,
              lineHeight: spacing + realHeightRatio,
              fontSize: units(size),
              color: color,
              fontFamily: family,
              fontWeight: weight,
              letterSpacing:
                typeof density === "number" ? units(density - 1) : density,
            };
          },
        })}
        {...props}
      />
    );
  },
);
