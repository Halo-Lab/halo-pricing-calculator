import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function ECommerceIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <path
        d="M20.7743 21.4975C20.7743 20.549 20.9611 19.6099 21.324 18.7336C21.687 17.8574 22.219 17.0612 22.8896 16.3906C23.5602 15.7199 24.3564 15.188 25.2327 14.825C26.1089 14.462 27.0481 14.2752 27.9965 14.2752C28.9449 14.2752 29.8841 14.462 30.7603 14.825C31.6366 15.188 32.4327 15.7199 33.1034 16.3906C33.774 17.0612 34.306 17.8574 34.669 18.7336C35.0319 19.6099 35.2187 20.549 35.2187 21.4975"
        stroke="url(#paint0_linear_51293_81420)"
        strokeWidth="3.43915"
      />
      <path
        d="M15.1932 24.4721C15.432 22.0041 17.5061 20.1211 19.9856 20.1211H36.0048C38.4843 20.1211 40.5584 22.0041 40.7972 24.4721L41.9288 36.1652C42.2026 38.9944 39.9788 41.4438 37.1364 41.4438H18.854C16.0116 41.4438 13.7878 38.9944 14.0616 36.1652L15.1932 24.4721Z"
        fill="url(#paint1_linear_51293_81420)"
      />
      <path
        d="M23.8672 28.7207H32.1212"
        stroke="#D94848"
        strokeWidth="2.75132"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.8672 28.7207H32.1212"
        stroke="url(#paint2_linear_51293_81420)"
        strokeWidth="2.75132"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81420"
          x1="28.0201"
          y1="12.2488"
          x2="28.0201"
          y2="32.657"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.164752" stopColor={invertColor} stopOpacity="0.7" />
          <stop offset="0.393361" stopColor={invertColor} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81420"
          x1="21.6063"
          y1="40.3327"
          x2="30.7651"
          y2="23.5071"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0751289" stopColor={invertColor} stopOpacity="0.6" />
          <stop offset="0.722953" stopColor={invertColor} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81420"
          x1="23.8672"
          y1="28.2207"
          x2="26.7967"
          y2="31.4376"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor="#7E73DB" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
