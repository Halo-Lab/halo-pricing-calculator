import { forwardRef, JSX, Ref } from "react";

import { units } from "./measurements";
import { Opaque, Decoration } from "./decorations";
import { Element, ElementProps, ElementCSSProperties, extend } from "./Element";

import "./Text.css";

export type TextCSSProperties = Opaque<
  Omit<
    ElementCSSProperties,
    | "font"
    | "color"
    | "whiteSpace"
    | "overflowWrap"
    | "fontFamily"
    | "fontWeight"
    | "fontSize"
    | "lineHeight"
    | "letterSpacing"
  >,
  "TextCSSProperties"
>;

export type TextBreaking = "anywhere" | "forbid" | "prefer-newlines";

export const TextDecoration = Decoration<TextCSSProperties>;

export interface TextProps<T extends keyof HTMLElementTagNameMap>
  extends Omit<ElementProps<TextCSSProperties>, "as" | "height"> {
  as?: T;
  size?: number;
  color?: ElementCSSProperties["color"];
  weight?: number;
  family?: string;
  spacing?: number;
  density?: ElementCSSProperties["letterSpacing"];
  breaking?: TextBreaking;
  realHeightRatio?: number;
  sideOffsetCorrection?: number;
}

export const Text = forwardRef(
  <T extends keyof HTMLElementTagNameMap = "span">(
    {
      as,
      size = 1,
      color,
      weight,
      family,
      spacing = 0,
      density,
      breaking,
      realHeightRatio = 0.74,
      sideOffsetCorrection = 0.05,
      _extend,
      ...props
    }: TextProps<T>,
    ref?: Ref<HTMLElementTagNameMap[T]>,
  ): JSX.Element => {
    return (
      <Element
        as={as ?? "span"}
        ref={ref}
        _extend={extend(_extend, {
          style(style = {}) {
            return {
              ...style,
              ["--c-font-spacing"]: spacing,
              ["--c-font-real-height-ratio"]: realHeightRatio,
              ["--c-font-side-offset-correction"]: units(sideOffsetCorrection),
              ["--c-font-size"]: units(size),
              color: color,
              whiteSpace:
                breaking === "forbid"
                  ? "nowrap"
                  : breaking === "prefer-newlines"
                    ? "pre-line"
                    : undefined,
              overflowWrap: breaking === "anywhere" ? "break-word" : undefined,
              fontFamily: family,
              fontWeight: weight,
              letterSpacing:
                typeof density === "number" ? units(density - 1) : density,
            };
          },
          className(value = "") {
            return `${value} c-text`;
          },
        })}
        {...props}
      />
    );
  },
);
