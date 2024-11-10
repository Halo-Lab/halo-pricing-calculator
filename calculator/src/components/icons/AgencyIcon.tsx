import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function AgencyIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 70 70" {...props}>
      <circle cx="35" cy="35" r="28" fill="currentColor" />
      <rect
        x="31.1133"
        y="31.1113"
        width="17.5"
        height="17.5"
        rx="6.45833"
        fill="url(#paint0_linear_51293_81396)"
      />
      <rect
        x="22.0391"
        y="21.3887"
        width="20.0926"
        height="27.2222"
        rx="4.53704"
        fill="url(#paint1_linear_51293_81396)"
      />
      <path
        d="M28.5195 31.7588H35.6492"
        stroke="url(#paint2_linear_51293_81396)"
        strokeWidth="2.59259"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.5195 37.5928H32.7325"
        stroke="#D94848"
        strokeWidth="2.59259"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.5195 37.5928H32.7325"
        stroke="url(#paint3_linear_51293_81396)"
        strokeWidth="2.59259"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81396"
          x1="39.2151"
          y1="36.6206"
          x2="51.2431"
          y2="40.0624"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.105421" stopColor={invertColor} stopOpacity="0.3" />
          <stop offset="0.837508" stopColor={invertColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81396"
          x1="25.6039"
          y1="23.6572"
          x2="42.021"
          y2="37.8128"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={invertColor} stopOpacity="0.6" />
          <stop offset="0.722953" stopColor={invertColor} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81396"
          x1="28.5195"
          y1="31.2588"
          x2="31.4578"
          y2="34.0458"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor="#7E73DB" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_51293_81396"
          x1="28.5195"
          y1="37.0928"
          x2="31.0294"
          y2="38.4995"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor="#7E73DB" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
