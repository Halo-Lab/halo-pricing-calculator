import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function WritingPenIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <circle cx="16" cy="16" r="16" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.3333 9.32812L20 11.9948L12.6667 19.3281H10V16.6615L17.3333 9.32812Z"
        stroke={invertColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 22.6719H22"
        stroke={invertColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
