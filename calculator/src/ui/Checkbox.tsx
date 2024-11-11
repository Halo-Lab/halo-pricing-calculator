import { ChangeEventHandler, forwardRef, JSX, Ref } from "react";

import { extend } from "./Element";
import { Decoration, Opaque } from "./decorations";
import { Box, BoxCSSProperties, BoxProps } from "./Box";

import "./Checkbox.css";

export type CheckboxCSSProperties = Opaque<
  Omit<BoxCSSProperties, "">,
  "BoxCSSProperties"
>;

export const CheckboxDecoration = Decoration<CheckboxCSSProperties>;

export type CheckboxProps = Omit<BoxProps<"label">, "as"> & {
  checked: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
} & (
    | { onlyOne?: false; groupId?: string }
    | {
        onlyOne: true;
        groupId: string;
      }
  );

export const Checkbox = forwardRef(
  (
    {
      checked,
      onlyOne,
      groupId,
      onChange,
      children,
      _extend,
      ...props
    }: CheckboxProps,
    ref?: Ref<HTMLInputElement>,
  ): JSX.Element => {
    return (
      <Box
        as="label"
        ref={ref}
        _extend={extend(_extend, {
          className(value = "") {
            return `${value} c-checkbox`;
          },
        })}
        {...props}
      >
        <input
          type={onlyOne ? "radio" : "checkbox"}
          name={groupId}
          checked={checked}
          onChange={onChange}
          readOnly={!onChange}
        />
        {children}
      </Box>
    );
  },
);
