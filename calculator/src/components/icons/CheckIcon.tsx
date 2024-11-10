import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function CheckIcon(props: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 16 17" {...props}>
      <path
        d="M13.3307 5.16406L5.9974 12.4974L2.66406 9.16406"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
