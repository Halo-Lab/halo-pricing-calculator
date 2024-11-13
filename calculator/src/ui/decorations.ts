import { CSSProperties } from "react";

import { units } from "./measurements";

export type DecorationDependency =
  | "self"
  | "direct-parent"
  | "any-parent"
  | "direct-previous-sibling"
  | "direct-next-sibling"
  | "any-previous-sibling"
  | "any-next-sibling"
  | "direct-children"
  | "any-child";

export type DecorationState =
  | "active"
  | "hovered"
  | "focused"
  | "checked"
  | "dragging-over-drop-zone"
  | "readonly"
  | "writable";

export type UniqueTraitOf<O> = O extends { __opaqueBy?: infer I } ? I : never;

export type Opaque<V, K extends string> = NonOpaque<V> & {
  __opaqueBy?: (
    v: K | (V extends { __opaqueBy?: (v: infer I) => void } ? I : never),
  ) => void;
};

export type NonOpaque<V> = Omit<V, "__opaqueBy">;

export type AnyCSSProperties = Opaque<CSSProperties, "AnyCSSProperties">;

export type CSSDecorationBuilder<
  O extends AnyCSSProperties,
  D = {},
> = UniqueTraitOf<O> & {
  readonly state: DecorationState | undefined;
  readonly dependencies: ReadonlyArray<DecorationDependency>;
  take(entries: O): CSSDecorationBuilder<O, D>;
  toString(elementId: string): string;
  dependOn(dependency: DecorationDependency): CSSDecorationBuilder<O, D>;
} & {
  [K in Exclude<keyof NonOpaque<O>, keyof D>]: (
    value: O[K],
  ) => CSSDecorationBuilder<O, D & { [P in K]: NonNullable<O[P]> }>;
};

export function Decoration<O extends AnyCSSProperties>(
  state?: DecorationState,
): CSSDecorationBuilder<O> {
  const entries: CSSProperties = {};
  const dependencies: Array<DecorationDependency> = [];

  const decorationBuilder: CSSDecorationBuilder<O> = new Proxy(
    {
      state,
      dependencies,
      take(providedEntries) {
        Object.assign(entries, providedEntries);

        return decorationBuilder;
      },
      toString(elementId: string) {
        const elementClass = `.c-element-id-${elementId}`;
        const dependencyState = state ? stateToCSS[state] : "";
        const rules = Object.entries(entries).reduce(
          (accumulator, [key, value]) => {
            if (value == null) {
              return accumulator;
            } else {
              const property = toKebabCase(key);

              return `${accumulator}${property}:${convertToCSS(property, value)};`;
            }
          },
          "",
        );

        if (!dependencies.length) {
          dependencies.push("self");
        }

        return (
          dependencies
            .map((dependency) => {
              const dependencySelector = `${dependency === "self" ? elementClass : ".c-element"}${dependencyState}`;

              switch (dependency) {
                case "self":
                  return dependencySelector;
                case "direct-parent":
                  return `${dependencySelector} > ${elementClass}`;
                case "any-parent":
                  return `${dependencySelector} ${elementClass}`;
                case "direct-previous-sibling":
                  return `${dependencySelector} + style[data-c-id] + ${elementClass}`;
                case "direct-next-sibling":
                  return `${elementClass}:has(+ style[data-c-id] + ${dependencySelector})`;
                case "any-previous-sibling":
                  return `${dependencySelector} ~ ${elementClass}`;
                case "any-next-sibling":
                  return `${elementClass}:has(~ ${dependencySelector})`;
                case "direct-children":
                  return `${elementClass}:has(> ${dependencySelector})`;
                case "any-child":
                  return `${elementClass}:has(${dependencySelector})`;
              }
            })
            .join(",") + `{${rules}}`
        );
      },
      dependOn(dependency) {
        if (!dependencies.includes(dependency)) {
          dependencies.push(dependency);
        }

        return decorationBuilder;
      },
    } as CSSDecorationBuilder<O>,
    {
      get(target, property, receiver) {
        if (Reflect.has(target, property)) {
          return Reflect.get(target, property, receiver);
        }

        return (value: unknown) => {
          (entries as Record<PropertyKey, unknown>)[property] = value;

          return decorationBuilder;
        };
      },
    },
  );

  return decorationBuilder;
}

const stateToCSS: Record<DecorationState, string> = {
  active: ":active",
  hovered: ":hover",
  focused: ":focus",
  checked: ":checked",
  readonly: ":read-only",
  writable: ":read-write",
  "dragging-over-drop-zone": ".c-drag-over-zone",
};

function toKebabCase(key: string): string {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

const unitlessProperties: Set<string> = new Set([
  "line-height",
  "opacity",
  "aspect-ratio",
  "font-weight",
  "flex",
  "flex-basis",
  "flex-grow",
  "flex-shrink",
]);

function convertToCSS(key: string, value: string | number): string | number {
  if (typeof value === "number") {
    if (unitlessProperties.has(key) || key.startsWith("--")) {
      return value;
    } else {
      return units(value);
    }
  } else {
    return value;
  }
}
