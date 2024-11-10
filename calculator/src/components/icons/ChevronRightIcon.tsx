import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function ChevronRightIcon(props: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <path
        d="M12.9961 22.001L18.9961 16.001L12.9961 10.001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
