import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function DownloadIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle
        cx="28"
        cy="28"
        r="27.72"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.56"
      />
      <path
        d="M19 33V36C19 37.1046 19.8954 38 21 38H35C36.1046 38 37 37.1046 37 36V33"
        stroke={invertColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 28L28 32L32 28"
        stroke={invertColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 18V32"
        stroke={invertColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
