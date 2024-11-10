import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function FinanceIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <rect
        x="15.3359"
        y="18.4336"
        width="25.1371"
        height="13.6767"
        rx="2.22222"
        transform="rotate(-15 15.3359 18.4336)"
        fill="url(#paint0_linear_51293_81303)"
      />
      <rect
        x="13"
        y="18.7197"
        width="30"
        height="21.1111"
        rx="3.33333"
        fill="url(#paint1_linear_51293_81303)"
      />
      <circle
        cx="36.8872"
        cy="29.2748"
        r="2.77778"
        fill="url(#paint2_linear_51293_81303)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81303"
          x1="31.9455"
          y1="9.66414"
          x2="27.9194"
          y2="24.6897"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor={invertColor} stopOpacity="0.7" />
          <stop offset="0.801265" stopColor={invertColor} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81303"
          x1="23.8333"
          y1="0.664172"
          x2="33.5556"
          y2="37.8864"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.697424" stopColor={invertColor} />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81303"
          x1="34.4566"
          y1="25.4554"
          x2="39.3177"
          y2="32.0526"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.319817" stopColor="#8E86D3" />
          <stop offset="0.659822" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
