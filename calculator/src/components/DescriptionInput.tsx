import { JSX, useState } from "react";

import { Color } from "../palettes/colours";
import { Input, InputProps } from "../ui/Input";
import { Text, TextDecoration } from "../ui/Text";
import { Box, BoxDecoration, BoxProps } from "../ui/Box";

interface DescriptionInputProps
  extends Pick<InputProps, "required" | "value" | "onChange">,
    Omit<BoxProps, "as" | "vertical" | "width" | "decorations"> {
  label: string;
}

export function DescriptionInput({
  label,
  value,
  onChange,
  required,
  ...props
}: DescriptionInputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box
      vertical
      width="fill"
      spacing={0.25}
      decorations={BoxDecoration()
        .borderBottomWidth("1px")
        .borderBottomColor(Color.blueDark20)}
      {...props}
    >
      <Text
        size={isFocused ? 0.75 : 1}
        moveDown={isFocused ? 0 : 1.25}
        color={Color.blueDark50}
        decorations={TextDecoration().transitionTimingFunction(
          "cubic-bezier(.215,.61,.355,1)",
        )}
      >
        {label}
        {required ? <Text color={Color.red}>*</Text> : null}
      </Text>
      <Input
        type="text"
        width="fill"
        multiline
        rows={5}
        spacing={0.4}
        value={value}
        required={required}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onFocusLost={() => setIsFocused(false)}
      />
    </Box>
  );
}
