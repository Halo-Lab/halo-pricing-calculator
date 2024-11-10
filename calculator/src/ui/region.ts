import { AriaAttributes } from "react";

export interface Region {
  description?: string;
}

export type RegionBuilder<R = {}> = {
  build(): AriaAttributes;
} & {
  [K in Exclude<keyof Region, keyof R>]: (
    value: NonNullable<Region[K]>,
  ) => RegionBuilder<{ [P in K]: NonNullable<Region[P]> } & R>;
};

export function Region(): RegionBuilder {
  const region: Region = {};

  const regionBuilder = new Proxy(
    {
      build() {
        return {
          "aria-label": region.description,
        };
      },
    } as RegionBuilder,
    {
      get(target, property, receiver) {
        if (Reflect.has(target, property)) {
          return Reflect.get(target, property, receiver);
        }

        return (value: unknown) => {
          (region as Record<PropertyKey, unknown>)[property] = value;

          return regionBuilder;
        };
      },
    },
  );

  return regionBuilder;
}
