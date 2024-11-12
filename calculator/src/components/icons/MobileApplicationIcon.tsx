import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function MobileApplicationIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <rect width="56" height="56" rx="28" fill="currentColor" />
      <circle
        cx="32.3988"
        cy="19.2152"
        r="8.43395"
        fill="url(#paint0_linear_51293_81295)"
      />
      <rect
        x="13.7188"
        y="20.2578"
        width="16.8192"
        height="16.9653"
        rx="1.21702"
        fill="url(#paint1_linear_51293_81295)"
      />
      <path
        d="M28.5833 30.167C29.3974 28.7568 31.4327 28.7568 32.2468 30.167L38.5436 41.0732C39.3577 42.4833 38.34 44.246 36.7118 44.246H24.1183C22.4901 44.246 21.4724 42.4833 22.2865 41.0732L28.5833 30.167Z"
        fill="url(#paint2_linear_51293_81295)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81295"
          x1="39.0591"
          y1="12.2858"
          x2="30.5849"
          y2="27.3717"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.390982" stopColor={invertColor} stopOpacity="0.35" />
          <stop offset="0.829412" stopColor={invertColor} stopOpacity="0.15" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81295"
          x1="10.7942"
          y1="41.0593"
          x2="34.1574"
          y2="21.3499"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.443473" stopColor={invertColor} stopOpacity="0.7" />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81295"
          x1="19.7726"
          y1="45.0363"
          x2="36.6153"
          y2="35.6134"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.683926" stopColor={invertColor} />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
