import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function LoaderIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 48 48" {...props}>
      <path
        d="M47 24C47 28.549 45.6511 32.9958 43.1238 36.7781C40.5965 40.5604 37.0044 43.5084 32.8017 45.2492C28.599 46.99 23.9745 47.4455 19.5129 46.5581C15.0514 45.6706 10.9532 43.4801 7.73654 40.2635C4.51994 37.0468 2.3294 32.9486 1.44194 28.4871C0.554478 24.0255 1.00996 19.401 2.75077 15.1983C4.49159 10.9956 7.43955 7.40347 11.2219 4.8762C15.0042 2.34893 19.451 1 24 1"
        stroke={invertColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
