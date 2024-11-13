import { JSX } from "react";

import { extend } from "./Element";
import { Decoration, Opaque } from "./decorations";
import { Box, BoxCSSProperties, BoxProps } from "./Box";

import "./Viewport.css";

export type ViewportCSSProperties = Opaque<
  BoxCSSProperties,
  "ViewportCSSProperties"
>;

export const ViewportDecoration = Decoration<ViewportCSSProperties>;

export interface ViewportProps extends Omit<BoxProps, "as"> {
  styles?: string;
}

export function Viewport({
  styles = "",
  _extend,
  ...props
}: ViewportProps): JSX.Element {
  return (
    <>
      {styles && <style data-global-styles>{styles}</style>}
      <Box
        as="div"
        _extend={extend(_extend, {
          className(value = "") {
            return `${value} c-viewport`;
          },
        })}
        {...props}
      />
    </>
  );
}
