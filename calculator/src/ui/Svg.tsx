import { forwardRef, JSX, Ref } from "react";

import { Opaque, Decoration } from "./decorations";
import { Element, ElementCSSProperties, ElementProps, extend } from "./Element";

import "./Svg.css";

export type SvgCSSProperties = Opaque<
  Omit<ElementCSSProperties, "">,
  "SvgCSSProperties"
>;

export const SvgDecoration = Decoration<SvgCSSProperties>;

export interface SvgProps extends Omit<ElementProps<SvgCSSProperties>, "as"> {
  color?: ElementCSSProperties["color"];
  viewBox: string;
  preserveAspectRatio?: string;
}

export const Svg = forwardRef(
  (
    { color, viewBox, preserveAspectRatio, _extend, ...props }: SvgProps,
    ref?: Ref<SVGSVGElement>,
  ): JSX.Element => {
    return (
      <Element
        as="svg"
        ref={ref}
        _extend={extend(_extend, {
          className(value = "") {
            return `${value} c-svg`;
          },
          color() {
            return color;
          },
          // @ts-expect-error
          // We declared that extend can accept only HTML attributes,
          // but this component actually covers SVG, so SVG-specific attributes
          // are obviously not recognised.
          xmlns() {
            return "http://www.w3.org/2000/svg";
          },
          viewBox() {
            return viewBox;
          },
          preserveAspectRatio() {
            return preserveAspectRatio;
          },
        })}
        {...props}
      />
    );
  },
);
