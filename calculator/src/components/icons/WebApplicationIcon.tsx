import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function WebApplicationIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <rect width="56" height="56" rx="28" fill="currentColor" />
      <path
        d="M13.4492 25.4463H31.3328V41.322H18.1186C15.5398 41.322 13.4492 39.2315 13.4492 36.6527V25.4463Z"
        fill="url(#paint0_linear_51293_81283)"
      />
      <path
        d="M31.3359 25.4463H42.0287V36.6527C42.0287 39.2315 39.9382 41.322 37.3594 41.322H31.3359V25.4463Z"
        fill="url(#paint1_linear_51293_81283)"
      />
      <path
        d="M13.4453 18.8871C13.4453 16.3083 15.5358 14.2178 18.1146 14.2178H37.3523C39.9311 14.2178 42.0216 16.3083 42.0216 18.8871V25.4475H13.4453V18.8871Z"
        fill="url(#paint2_linear_51293_81283)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81283"
          x1="15.5271"
          y1="43.1197"
          x2="26.3833"
          y2="24.0221"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.24666" stopColor={invertColor} stopOpacity="0.7" />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81283"
          x1="42.0287"
          y1="28.7615"
          x2="27.7289"
          y2="34.8316"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={invertColor} stopOpacity="0.35" />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.15" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81283"
          x1="16.0018"
          y1="28.3659"
          x2="39.3484"
          y2="12.9104"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.142607" stopColor={invertColor} />
          <stop offset="0.814792" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
