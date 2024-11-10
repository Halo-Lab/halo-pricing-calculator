import { EventHandler, JSX, SyntheticEvent } from "react";

import { extend } from "./Element";
import { Box, BoxProps } from "./Box";

import "./Checkbox.css";

export interface CheckboxProps extends Omit<BoxProps<"label">, "as"> {
  checked: boolean;
  onChange?: EventHandler<SyntheticEvent<HTMLInputElement>>;
}

export function Checkbox({
  checked,
  onChange,
  children,
  _extend,
  ...props
}: CheckboxProps): JSX.Element {
  return (
    <Box
      as="label"
      _extend={extend(_extend, {
        className(value = "") {
          return `${value} c-checkbox`;
        },
      })}
      {...props}
    >
      <input type="checkbox" checked={checked} onChange={onChange} />
      {children}
    </Box>
  );
}
