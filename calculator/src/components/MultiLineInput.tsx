import { JSX } from "react";

import { Text } from "../ui/Text";
import { Color } from "../palettes/colours";
import { Input, InputProps } from "../ui/Input";

type MultiLineInputProperties = Omit<
  InputProps,
  "type" | "multiline" | "_extendUnderlyingInput"
> & {
  label: string;
};

export function MultiLineInput({
  label,
  ...props
}: MultiLineInputProperties): JSX.Element {
  return (
    <Input
      type="text"
      multiline
      data-multiline-input="true"
      _extendUnderlyingInput={{
        className: "input w-input is-textarea",
        maxLength: 5000,
        // @ts-expect-error
        "data-input-anim": "",
        "data-lenis-prevent-off": "",
      }}
      {...props}
    >
      <Text
        _extend={{
          className: "form__label is--textarea",
        }}
      >
        {label}
        {props.required ? <Text color={Color.red}>*</Text> : null}
      </Text>
    </Input>
  );
}
