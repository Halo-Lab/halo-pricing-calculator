import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function PlusIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 48 48" {...props}>
      <circle
        cx="24"
        cy="24"
        r="23"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M16.2227 23.998L31.7782 23.998"
        stroke={invertColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 31.7754L24 16.2198"
        stroke={invertColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
