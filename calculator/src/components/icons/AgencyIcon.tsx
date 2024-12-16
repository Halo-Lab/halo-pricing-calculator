import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function AgencyIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <rect
        x="24.1133"
        y="24.1113"
        width="17.5"
        height="17.5"
        rx="6.45833"
        fill="url(#paint0_linear_51293_81396)"
      />
      <rect
        x="15.0391"
        y="14.3887"
        width="20.0926"
        height="27.2222"
        rx="4.53704"
        fill="url(#paint1_linear_51293_81396)"
      />
      <path
        d="M21.5195 24.7588H28.6492"
        stroke="url(#paint2_linear_51293_81396)"
        strokeWidth="2.59259"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5195 30.5928H25.7325"
        stroke="#D94848"
        strokeWidth="2.59259"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5195 30.5928H25.7325"
        stroke="url(#paint3_linear_51293_81396)"
        strokeWidth="2.59259"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81396"
          x1="32.2151"
          y1="29.6206"
          x2="44.2431"
          y2="33.0624"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.105421" stopColor={invertColor} stopOpacity="0.3" />
          <stop offset="0.837508" stopColor={invertColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81396"
          x1="18.6039"
          y1="16.6572"
          x2="35.021"
          y2="30.8128"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={invertColor} stopOpacity="0.6" />
          <stop offset="0.722953" stopColor={invertColor} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81396"
          x1="21.5195"
          y1="24.2588"
          x2="24.4578"
          y2="27.0458"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor="#7E73DB" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_51293_81396"
          x1="21.5195"
          y1="30.0928"
          x2="24.0294"
          y2="31.4995"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor="#7E73DB" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
