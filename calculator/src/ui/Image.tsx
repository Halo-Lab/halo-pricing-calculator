import { JSX, forwardRef, Ref } from "react";

import { Opaque, Decoration } from "./decorations";
import { extend, Element, ElementProps, ElementCSSProperties } from "./Element";

import "./Image.css";

export type ImageCSSProperties = Opaque<
  Omit<ElementCSSProperties, "objectFit">,
  "ImageCSSProperties"
>;

export const ImageDecoration = Decoration<ImageCSSProperties>;

export type ImageFit = "contain" | "cover" | "fill" | "scale-down";

export interface ImageDescriptor {
  url: string | URL;
  width?: number;
  density?: number;
}

export interface ImageSourceDescriptor {
  source:
    | string
    | URL
    | ImageDescriptor
    | Array<string | URL | ImageDescriptor>;
  type?: string;
  media?: string;
}

export interface ImageProps
  extends Omit<ElementProps<ImageCSSProperties>, "as" | "children"> {
  fit?: ImageFit;
  source:
    | string
    | URL
    | Array<string | URL | ImageDescriptor | ImageSourceDescriptor>;
  description: string;
}

export const Image = forwardRef(
  (
    { fit = "cover", source, description, _extend, ...props }: ImageProps,
    ref?: Ref<HTMLImageElement>,
  ): JSX.Element => {
    // It is assumed that URLs are sorted from the highest to the lowest quality.
    const lastSource = Array.isArray(source) ? source.at(-1) : source;

    const fallbackSrc = lastSource ? sourceToString(lastSource) : undefined;

    return (
      <Element
        as="picture"
        _extend={extend(_extend, {
          className(value = "") {
            return `${value} c-picture`;
          },
        })}
        {...props}
      >
        {Array.isArray(source)
          ? source.slice(0, -1).map((descriptor) => {
              const srcSet = sourceToString(descriptor);
              let type: string | undefined;
              let media: string | undefined;

              if (typeof descriptor !== "string") {
                if ("type" in descriptor) {
                  type = descriptor.type;
                }
                if ("media" in descriptor) {
                  media = descriptor.media;
                }
              }

              return <source srcSet={srcSet} media={media} type={type} />;
            })
          : null}
        <img
          ref={ref}
          className={`c-img ${fit ? `c-img-fit-${fit}` : ""}`}
          src={fallbackSrc}
          alt={description}
        />
      </Element>
    );
  },
);

function sourceToString(
  source: string | URL | ImageDescriptor | ImageSourceDescriptor,
): string {
  if (typeof source === "string") {
    return source;
  } else if (source instanceof URL) {
    return source.toString();
  } else if ("url" in source) {
    return `${source.url}${source.width ? ` ${source.width}w` : ""}${source.density ? ` ${source.density}x` : ""}`;
  } else {
    return Array.isArray(source.source)
      ? source.source.map(sourceToString).join(", ")
      : sourceToString(source.source);
  }
}
