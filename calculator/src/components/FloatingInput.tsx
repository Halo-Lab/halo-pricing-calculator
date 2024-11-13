import { JSX, useState } from "react";

import { Color } from "../palettes/colours";
import { Input, InputDecoration, InputProps } from "../ui/Input";
import { Text, TextDecoration } from "../ui/Text";
import { Box, BoxDecoration, BoxProps } from "../ui/Box";

interface FloatingInputProps
  extends Pick<
      InputProps,
      "required" | "value" | "onChange" | "multiline" | "type" | "hint"
    >,
    Omit<BoxProps, "as" | "vertical" | "width" | "decorations"> {
  label: string;
}

export function FloatingInput({
  type,
  hint,
  label,
  value,
  onChange,
  required,
  multiline,
  ...props
}: FloatingInputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box
      vertical
      width="fill"
      spacing={0.35}
      decorations={BoxDecoration()
        .borderBottomWidth("1px")
        .borderBottomColor(Color.blueDark20)}
      {...props}
    >
      <Text
        size={value || isFocused ? 0.75 : 1}
        moveDown={value || isFocused ? 0 : 1.25}
        color={Color.blueDark50}
        decorations={TextDecoration().transitionTimingFunction(
          "cubic-bezier(.215,.61,.355,1)",
        )}
      >
        {label}
        {required ? <Text color={Color.red}>*</Text> : null}
      </Text>
      {/* @ts-expect-error */}
      <Input
        type={type}
        hint={hint}
        width="fill"
        multiline={multiline}
        rows={multiline ? 5 : undefined}
        spacing={multiline ? 0.4 : undefined}
        value={value}
        required={required}
        onChange={onChange}
        padding={[0, 0, 1, 0]}
        onFocus={() => setIsFocused(true)}
        onFocusLost={() => setIsFocused(false)}
      />
    </Box>
  );
}
