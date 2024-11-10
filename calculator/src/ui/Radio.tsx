import { EventHandler, JSX, SyntheticEvent } from "react";

import { extend } from "./Element";
import { Box, BoxProps } from "./Box";

import "./Radio.css";

export interface RadioProps extends Omit<BoxProps<"label">, "as"> {
  groupId: string;
  checked: boolean;
  onChange?: EventHandler<SyntheticEvent<HTMLInputElement>>;
}

export function Radio({
  groupId,
  checked,
  onChange,
  children,
  _extend,
  ...props
}: RadioProps): JSX.Element {
  return (
    <Box
      as="label"
      _extend={extend(_extend, {
        className(value = "") {
          return `${value} c-radio`;
        },
      })}
      {...props}
    >
      <input
        type="radio"
        name={groupId}
        checked={checked}
        onChange={onChange}
        readOnly={!onChange}
      />
      {children}
    </Box>
  );
}
