import { forwardRef, JSX, Ref } from "react";

import { units } from "./measurements";
import { Decoration, Opaque } from "./decorations";
import { Element, ElementCSSProperties, ElementProps, extend } from "./Element";

import "./Box.css";

export type BoxCSSProperties = Opaque<
  Omit<ElementCSSProperties, "gap">,
  "BoxCSSProperties"
>;

export const BoxDecoration = Decoration<BoxCSSProperties>;

export interface BoxProps<T extends keyof HTMLElementTagNameMap = "div">
  extends Omit<ElementProps<BoxCSSProperties>, "as"> {
  as?: T;
  above?: JSX.Element;
  below?: JSX.Element;
  onLeft?: JSX.Element;
  onRight?: JSX.Element;
  inFront?: JSX.Element;
  spacing?: number;
  reverse?: boolean;
  behindContent?: JSX.Element;
}

export const Box = forwardRef(
  <T extends keyof HTMLElementTagNameMap = "div">(
    {
      as,
      above,
      below,
      onLeft,
      onRight,
      inFront,
      spacing,
      reverse,
      children,
      behindContent,
      _extend,
      ...props
    }: BoxProps<T>,
    ref?: Ref<HTMLElementTagNameMap[T]>,
  ): JSX.Element => {
    return (
      <Element
        as={as ?? "div"}
        ref={ref}
        _extend={extend(_extend, {
          style(style = {}) {
            return {
              ...style,
              gap: spacing != null ? units(spacing) : undefined,
            };
          },
          className(value = "") {
            return `${value} c-box ${reverse ? " c-reverse" : ""}`;
          },
        })}
        {...props}
      >
        {behindContent && (
          <Box
            width="fill"
            height="fill"
            _extend={{ className: "c-absolute c-behind-content" }}
          >
            {behindContent}
          </Box>
        )}
        {children}
        {above && (
          <Box width="fill" _extend={{ className: "c-absolute c-above" }}>
            {above}
          </Box>
        )}
        {below && (
          <Box width="fill" _extend={{ className: "c-absolute c-below" }}>
            {below}
          </Box>
        )}
        {onLeft && (
          <Box height="fill" _extend={{ className: "c-absolute c-on-left" }}>
            {onLeft}
          </Box>
        )}
        {onRight && (
          <Box height="fill" _extend={{ className: "c-absolute c-on-right" }}>
            {onRight}
          </Box>
        )}
        {inFront && (
          <Box
            width="fill"
            height="fill"
            _extend={{ className: "c-absolute c-in-front" }}
          >
            {inFront}
          </Box>
        )}
      </Element>
    );
  },
);
