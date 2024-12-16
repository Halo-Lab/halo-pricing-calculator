import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function SocialNetworkIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <path
        d="M41.9961 34.0003C41.9961 29.9502 38.7128 26.667 34.6628 26.667C30.6127 26.667 27.3294 29.9502 27.3294 34.0003C27.3294 38.0504 30.6127 41.3337 34.6628 41.3337H39.6544C40.9477 41.3337 41.9961 40.2852 41.9961 38.9919V34.0003Z"
        fill="url(#paint0_linear_51293_81389)"
      />
      <path
        d="M14.6641 26.3333C14.6641 19.5218 20.1859 14 26.9974 14C33.8089 14 39.3307 19.5218 39.3307 26.3333C39.3307 33.1448 33.8089 38.6667 26.9974 38.6667H18.6024C16.4273 38.6667 14.6641 36.9034 14.6641 34.7283V26.3333Z"
        fill="url(#paint1_linear_51293_81389)"
      />
      <path
        d="M23.332 27H29.9987"
        stroke="url(#paint2_linear_51293_81389)"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81389"
          x1="31.8591"
          y1="26.6966"
          x2="45.6628"
          y2="45.667"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.282633" stopColor={invertColor} stopOpacity="0.3" />
          <stop offset="0.567369" stopColor={invertColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81389"
          x1="39.3307"
          y1="10.3333"
          x2="19.188"
          y2="42.4142"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.447812" stopColor={invertColor} />
          <stop offset="0.80867" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81389"
          x1="23.332"
          y1="29.5"
          x2="28.0475"
          y2="30.5953"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor="#7E73DB" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
