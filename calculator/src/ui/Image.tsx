import { JSX, forwardRef, Ref } from "react";

import { Opaque, Decoration } from "./decorations";
import { Element, ElementProps, ElementCSSProperties, extend } from "./Element";

import "./Image.css";

export type ImageCSSProperties = Opaque<
  Omit<ElementCSSProperties, "objectFit">,
  "ImageCSSProperties"
>;

export const ImageDecoration = Decoration<ImageCSSProperties>;

export type ImageFit = "contain" | "cover" | "fill" | "scale-down";

export interface ImageProps
  extends Omit<ElementProps<ImageCSSProperties>, "as" | "children"> {
  fit?: ImageFit;
  source: string | URL | Array<string | URL>;
  description: string;
}

export const Image = forwardRef(
  (
    { fit = "cover", source, description, _extend, ...props }: ImageProps,
    ref?: Ref<HTMLImageElement>,
  ): JSX.Element => {
    return (
      <Element
        as="img"
        ref={ref}
        _extend={extend(_extend, {
          className(value = "") {
            return `${value} c-img ${fit ? `c-img-fit-${fit}` : ""}`;
          },
          src() {
            return Array.isArray(source)
              ? source.map(sourceToString).join(", ")
              : sourceToString(source);
          },
          alt() {
            return description;
          },
        })}
        {...props}
      />
    );
  },
);

function sourceToString(source: string | URL): string {
  return source instanceof URL ? source.toString() : source;
}
