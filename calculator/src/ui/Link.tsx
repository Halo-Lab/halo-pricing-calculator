import { JSX } from "react";

import { extend } from "./Element";
import { Decoration, Opaque } from "./decorations";
import { Box, BoxCSSProperties, BoxProps } from "./Box";

import "./Link.css";

export type LinkCSSProperties = Opaque<BoxCSSProperties, "LinkCSSProperties">;

export const LinkDecoration = Decoration<LinkCSSProperties>;

export type LinkDestination = "self" | "new-tab";

export interface LinkProps extends Omit<BoxProps<"a">, "as"> {
  url: URL | string;
  openIn?: LinkDestination;
  download?: boolean | string;
}

export function Link({
  url,
  openIn,
  download,
  _extend,
  ...props
}: LinkProps): JSX.Element {
  return (
    <Box
      as="a"
      _extend={extend(_extend, {
        className(value = "") {
          return `${value} c-link`;
        },
        href() {
          return url instanceof URL ? url.toString() : url;
        },
        target() {
          return openIn === "self"
            ? "_self"
            : openIn === "new-tab"
              ? "_blank"
              : undefined;
        },
        download() {
          return download;
        },
      })}
      {...props}
    />
  );
}
