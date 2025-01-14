import {
  JSX,
  Ref,
  useId,
  forwardRef,
  createElement,
  PropsWithChildren,
  AllHTMLAttributes,
} from "react";

import { Alignment } from "./alignment";
import { Region, RegionBuilder } from "./region";
import { computeSpace, Fraction, Space, units } from "./measurements";
import {
  Opaque,
  Decoration,
  AnyCSSProperties,
  CSSDecorationBuilder,
} from "./decorations";

import "./Element.css";

declare module "react" {
  interface CSSProperties {
    [key: `--c-${string}`]: string | number | undefined;
  }
}

export type ElementCSSProperties = Opaque<
  Omit<
    AnyCSSProperties,
    | "boxSizing"
    | "width"
    | "height"
    | "maxWidth"
    | "maxHeight"
    | "minWidth"
    | "minHeight"
    | "margin"
    | "padding"
    | "marginLeft"
    | "marginRight"
    | "marginTop"
    | "marginBottom"
    | "paddingLeft"
    | "paddingRight"
    | "paddingTop"
    | "paddingBottom"
    | "aspectRatio"
    | "display"
    | "flexDirection"
    | "alignSelf"
    | "alignItems"
    | "justifyContent"
    | "position"
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "transform"
    | "overflow"
    | "overflowX"
    | "overflowY"
  >,
  "ElementCSSProperties"
>;

export const ElementDecoration = Decoration<ElementCSSProperties>;

export type Clip = "hidden" | "scrollable";

export interface ElementProps<CP extends ElementCSSProperties>
  extends PropsWithChildren {
  as: string;
  name?: string & {};

  width?: Space;
  height?: Space;
  maxWidth?: Space;
  maxHeight?: Space;
  minWidth?: Space;
  minHeight?: Space;
  padding?: number | [number, number?, number?, number?];
  aspectRatio?: number | [number, number];
  clipX?: Clip;
  clipY?: Clip;

  alignX?: Alignment;
  alignY?: Alignment;
  moveUp?: number | Fraction;
  moveDown?: number | Fraction;
  moveLeft?: number | Fraction;
  moveRight?: number | Fraction;

  scale?: number | [number, number, number?];
  rotate?: number | [number, number, number, number];

  vertical?: boolean;
  decorations?:
    | CSSDecorationBuilder<CP, CP>
    | Array<CSSDecorationBuilder<CP, CP>>;

  region?: RegionBuilder<Region>;

  /** @internal */
  _extend?: AllHTMLAttributes<Element>;
}

export const Element = forwardRef(
  (
    {
      as,
      name,
      alignX = "start",
      alignY = "start",
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      clipX,
      clipY,
      moveUp,
      moveDown,
      moveLeft,
      moveRight,
      rotate,
      scale,
      padding,
      vertical = false,
      children,
      aspectRatio,
      decorations,
      region,
      _extend = {},
    }: ElementProps<ElementCSSProperties>,
    ref?: Ref<Element>,
  ): JSX.Element => {
    const elementId = useId().replaceAll(":", "i");
    const style = Object.assign({}, _extend.style);
    let className =
      (_extend.className ?? "") +
      ` c-element c-element-id-${elementId}` +
      (vertical ? " c-vertical" : "") +
      ` c-align-x-${alignX} c-align-y-${alignY}`;

    style.aspectRatio = Array.isArray(aspectRatio)
      ? aspectRatio[0] / aspectRatio[1]
      : aspectRatio;
    style.padding = Array.isArray(padding)
      ? padding.map((value = 0) => units(value)).join(" ")
      : padding != null
        ? units(padding)
        : undefined;
    style.width = computeSpace(width);
    if (height === "fill") {
      className += " c-try-fill-height";
      style["--c-element-height"] = computeSpace(height);
    } else {
      style.height = computeSpace(height);
    }
    style.maxWidth = computeSpace(maxWidth);
    style.maxHeight = computeSpace(maxHeight);
    style.minWidth = computeSpace(minWidth);
    style.minHeight = computeSpace(minHeight);
    style.overflowX = clipMap[clipX as Clip];
    style.overflowY = clipMap[clipY as Clip];

    if (
      (moveUp ?? moveDown ?? moveLeft ?? moveRight ?? rotate ?? scale) != null
    ) {
      style.transform =
        "translate3d(var(--c-translate-x, 0rem), var(--c-translate-y, 0rem), 0.01rem) " +
        "rotate3d(var(--c-rotate-x, 0), var(--c-rotate-y, 0), var(--c-rotate-z, 0), var(--c-rotate-a, 0deg)) " +
        "scale3d(var(--c-scale-x, 1), var(--c-scale-y, 1), var(--c-scale-z, 1))";

      style["--c-translate-x"] =
        moveLeft != null
          ? "-" + computeSpace(moveLeft)
          : moveRight != null
            ? computeSpace(moveRight)
            : undefined;
      style["--c-translate-y"] =
        moveUp != null
          ? "-" + computeSpace(moveUp)
          : moveDown != null
            ? computeSpace(moveDown)
            : undefined;

      if (Array.isArray(rotate)) {
        const [x, y, z, a] = rotate;
        style["--c-rotate-x"] = units(x);
        style["--c-rotate-y"] = units(y);
        style["--c-rotate-z"] = units(z);
        style["--c-rotate-a"] = units(a, "deg");
      } else if (rotate != null) {
        style["--c-rotate-a"] = units(rotate, "deg");
      }

      if (scale != null) {
        let x = 1,
          y = 1,
          z = 1;
        if (Array.isArray(scale)) {
          [x, y, z = 1] = scale;
        } else {
          x = y = z = scale;
        }

        style["--c-scale-x"] = x;
        style["--c-scale-y"] = y;
        style["--c-scale-z"] = z;
      }
    }

    const internalStyles: Array<string> = [
      Decoration().take(style).toString(elementId),
    ];

    if (Array.isArray(decorations)) {
      decorations.forEach((decoration) =>
        internalStyles.push(decoration.toString(elementId)),
      );
    } else if (decorations) {
      internalStyles.push(decorations.toString(elementId));
    }

    const element = createElement(
      as,
      {
        ..._extend,
        ...(region?.build() ?? {}),
        ref,
        style: undefined,
        className,
        [`data-c-name`]: name,
      },
      children,
    );

    return (
      <>
        <style data-c-id={`styles-for-c-element-id-${elementId}`}>
          {internalStyles.join("\n")}
        </style>
        {element}
      </>
    );
  },
);
const clipMap: Record<
  Clip,
  AnyCSSProperties["overflowX"] | AnyCSSProperties["overflowY"]
> = {
  hidden: "hidden",
  scrollable: "auto",
};

export function extend(
  _extend: AllHTMLAttributes<Element> | undefined,
  extension: {
    [K in keyof AllHTMLAttributes<Element>]: (
      current: AllHTMLAttributes<Element>[K],
    ) => AllHTMLAttributes<Element>[K];
  },
): AllHTMLAttributes<Element> {
  _extend ??= {};

  const extended: AllHTMLAttributes<Element> = {
    ..._extend,
  };

  for (const key in extension) {
    extended[key as keyof AllHTMLAttributes<Element>] = extension[
      key as keyof AllHTMLAttributes<Element>
    ]!(extended[key as keyof AllHTMLAttributes<Element>]);
  }

  return extended;
}
