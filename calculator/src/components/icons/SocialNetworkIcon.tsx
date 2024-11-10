import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function SocialNetworkIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 72 72" {...props}>
      <circle cx="36" cy="36" r="28" fill="currentColor" />
      <path
        d="M49.9961 42.0003C49.9961 37.9502 46.7128 34.667 42.6628 34.667C38.6127 34.667 35.3294 37.9502 35.3294 42.0003C35.3294 46.0504 38.6127 49.3337 42.6628 49.3337H47.6544C48.9477 49.3337 49.9961 48.2852 49.9961 46.9919V42.0003Z"
        fill="url(#paint0_linear_51293_81389)"
      />
      <path
        d="M22.6641 34.3333C22.6641 27.5218 28.1859 22 34.9974 22C41.8089 22 47.3307 27.5218 47.3307 34.3333C47.3307 41.1448 41.8089 46.6667 34.9974 46.6667H26.6024C24.4273 46.6667 22.6641 44.9034 22.6641 42.7283V34.3333Z"
        fill="url(#paint1_linear_51293_81389)"
      />
      <path
        d="M31.332 35H37.9987"
        stroke="url(#paint2_linear_51293_81389)"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81389"
          x1="39.8591"
          y1="34.6966"
          x2="53.6628"
          y2="53.667"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.282633" stopColor={invertColor} stopOpacity="0.3" />
          <stop offset="0.567369" stopColor={invertColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81389"
          x1="47.3307"
          y1="18.3333"
          x2="27.188"
          y2="50.4142"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.447812" stopColor={invertColor} />
          <stop offset="0.80867" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81389"
          x1="31.332"
          y1="37.5"
          x2="36.0475"
          y2="38.5953"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor="#7E73DB" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
