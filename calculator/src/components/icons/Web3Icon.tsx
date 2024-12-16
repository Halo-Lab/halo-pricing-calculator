import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function Web3Icon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <g clipPath="url(#clip0_51293_81383)">
        <path
          d="M27.9217 36.567C27.9226 36.567 27.9229 36.5658 27.9222 36.5653L21.6937 32.8896C20.6937 32.2995 19.5969 33.4924 20.2687 34.4394L27.041 43.9864C27.4699 44.591 28.3673 44.5912 28.7966 43.9868L35.5757 34.441C36.2481 33.4941 35.1515 32.3006 34.1513 32.8906L27.9213 36.5653C27.9205 36.5658 27.9208 36.567 27.9217 36.567Z"
          fill="url(#paint0_linear_51293_81383)"
        />
        <path
          d="M29.0028 12.3085C28.5843 11.614 27.5773 11.614 27.1588 12.3085L18.0718 27.3907C17.7632 27.9028 17.9312 28.5683 18.4458 28.8727L27.5332 34.247C27.871 34.4467 28.2907 34.4469 28.6285 34.2474L37.7191 28.8789C38.2342 28.5747 38.4024 27.9089 38.0937 27.3965L29.0028 12.3085Z"
          fill="url(#paint1_linear_51293_81383)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_51293_81383"
          x1="33.1678"
          y1="31.7315"
          x2="28.7465"
          y2="49.561"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.315026" stopColor={invertColor} stopOpacity="0.3" />
          <stop offset="0.613347" stopColor={invertColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81383"
          x1="41.2035"
          y1="9.0561"
          x2="21.7072"
          y2="37.5483"
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
            transform="translate(10.7773 10.7783)"
          />
        </clipPath>
      </defs>
    </Svg>
  );
}
