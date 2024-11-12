import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function WebsiteIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <rect width="56" height="56" rx="28" fill="currentColor" />
      <rect
        x="13.375"
        y="16.4727"
        width="28.6464"
        height="23.2533"
        rx="4.66933"
        fill="url(#paint0_linear_51293_81284)"
      />
      <path
        d="M29.1338 33.3258C28.8766 32.6638 29.5284 32.0114 30.1907 32.268L44.4847 37.8059C45.1586 38.067 45.1866 39.0103 44.5293 39.3109L40.3799 41.2088C39.359 41.6758 38.5405 42.4949 38.0744 43.5162L36.1867 47.6516C35.8866 48.3092 34.9434 48.2819 34.6817 47.6082L29.1338 33.3258Z"
        fill="url(#paint1_linear_51293_81284)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81284"
          x1="16.4689"
          y1="40.9329"
          x2="37.0164"
          y2="16.3553"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.330129" stopColor={invertColor} stopOpacity="0.7" />
          <stop offset="0.906847" stopColor={invertColor} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81284"
          x1="28.4421"
          y1="48.2476"
          x2="40.3255"
          y2="33.3057"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={invertColor} />
          <stop offset="0.444792" stopColor={invertColor} />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
