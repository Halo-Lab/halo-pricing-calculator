import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function Web3Icon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 62 62" {...props}>
      <circle cx="31" cy="31" r="28" fill="currentColor" />
      <g clipPath="url(#clip0_51293_81383)">
        <path
          d="M30.9217 39.567C30.9226 39.567 30.9229 39.5658 30.9222 39.5653L24.6937 35.8896C23.6937 35.2995 22.5969 36.4924 23.2687 37.4394L30.041 46.9864C30.4699 47.591 31.3673 47.5912 31.7966 46.9868L38.5757 37.441C39.2481 36.4941 38.1515 35.3006 37.1513 35.8906L30.9213 39.5653C30.9205 39.5658 30.9208 39.567 30.9217 39.567Z"
          fill="url(#paint0_linear_51293_81383)"
        />
        <path
          d="M32.0028 15.3085C31.5843 14.614 30.5773 14.614 30.1588 15.3085L21.0718 30.3907C20.7632 30.9028 20.9312 31.5683 21.4458 31.8727L30.5332 37.247C30.871 37.4467 31.2907 37.4469 31.6285 37.2474L40.7191 31.8789C41.2342 31.5747 41.4024 30.9089 41.0937 30.3965L32.0028 15.3085Z"
          fill="url(#paint1_linear_51293_81383)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_51293_81383"
          x1="36.1678"
          y1="34.7315"
          x2="31.7465"
          y2="52.561"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.315026" stopColor={invertColor} stopOpacity="0.3" />
          <stop offset="0.613347" stopColor={invertColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81383"
          x1="44.2035"
          y1="12.0561"
          x2="24.7072"
          y2="40.5483"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.447812" stopColor={invertColor} />
          <stop offset="0.719358" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <clipPath id="clip0_51293_81383">
          <rect
            width="34.4444"
            height="34.4444"
            fill={invertColor}
            transform="translate(13.7773 13.7783)"
          />
        </clipPath>
      </defs>
    </Svg>
  );
}
