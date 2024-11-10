import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function ECommerceIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <circle cx="30" cy="31" r="28" fill="currentColor" />
      <path
        d="M22.7743 24.4975C22.7743 23.549 22.9611 22.6099 23.324 21.7336C23.687 20.8574 24.219 20.0612 24.8896 19.3906C25.5602 18.7199 26.3564 18.188 27.2327 17.825C28.1089 17.462 29.0481 17.2752 29.9965 17.2752C30.9449 17.2752 31.8841 17.462 32.7603 17.825C33.6366 18.188 34.4327 18.7199 35.1034 19.3906C35.774 20.0612 36.306 20.8574 36.669 21.7336C37.0319 22.6099 37.2187 23.549 37.2187 24.4975"
        stroke="url(#paint0_linear_51293_81420)"
        strokeWidth="3.43915"
      />
      <path
        d="M17.1932 27.4721C17.432 25.0041 19.5061 23.1211 21.9856 23.1211H38.0048C40.4843 23.1211 42.5584 25.0041 42.7972 27.4721L43.9288 39.1652C44.2026 41.9944 41.9788 44.4438 39.1364 44.4438H20.854C18.0116 44.4438 15.7878 41.9944 16.0616 39.1652L17.1932 27.4721Z"
        fill="url(#paint1_linear_51293_81420)"
      />
      <path
        d="M25.8672 31.7207H34.1212"
        stroke="#D94848"
        strokeWidth="2.75132"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.8672 31.7207H34.1212"
        stroke="url(#paint2_linear_51293_81420)"
        strokeWidth="2.75132"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81420"
          x1="30.0201"
          y1="15.2488"
          x2="30.0201"
          y2="35.657"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.164752" stopColor={invertColor} stopOpacity="0.7" />
          <stop offset="0.393361" stopColor={invertColor} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81420"
          x1="23.6063"
          y1="43.3327"
          x2="32.7651"
          y2="26.5071"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0751289" stopColor={invertColor} stopOpacity="0.6" />
          <stop offset="0.722953" stopColor={invertColor} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81420"
          x1="25.8672"
          y1="31.2207"
          x2="28.7967"
          y2="34.4376"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor="#7E73DB" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
