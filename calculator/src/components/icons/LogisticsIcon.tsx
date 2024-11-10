import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function LogisticsIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <mask
        id="mask0_51293_81337"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="13"
        y="11"
        width="30"
        height="34"
      >
        <path
          d="M13.7002 20.7251C13.7002 20.1203 14.023 19.5614 14.5468 19.2592L27.1436 11.9905C27.6675 11.6882 28.3129 11.6885 28.8366 11.9912L41.4351 19.274C41.9583 19.5765 42.2806 20.135 42.2806 20.7394V35.2518C42.2806 35.8566 41.958 36.4154 41.4342 36.7177L28.835 43.991C28.312 44.2929 27.6677 44.2933 27.1443 43.992L14.5474 36.7395C14.0226 36.4374 13.6992 35.878 13.6993 35.2725L13.7002 20.7251Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_51293_81337)">
        <rect
          width="16.5015"
          height="16.5015"
          transform="matrix(-0.866025 0.5 0 -1 42.2852 36.251)"
          fill="url(#paint0_linear_51293_81337)"
        />
        <rect
          width="16.5015"
          height="16.5015"
          transform="matrix(-0.866025 -0.5 0 -1 27.9883 44.5)"
          fill="url(#paint1_linear_51293_81337)"
        />
        <rect
          width="16.5015"
          height="16.5015"
          transform="matrix(-0.866025 -0.5 0.866025 -0.5 27.9883 28.0039)"
          fill="url(#paint2_linear_51293_81337)"
        />
        <path
          d="M35.0816 23.9047H36.2816V23.2393L35.7172 22.8869L35.0816 23.9047ZM33.8816 28.423C33.8816 29.0858 34.4188 29.623 35.0816 29.623C35.7443 29.623 36.2816 29.0858 36.2816 28.423H33.8816ZM20.1456 15.9925L34.446 24.9225L35.7172 22.8869L21.4169 13.9568L20.1456 15.9925ZM33.8816 23.9047V28.423H36.2816V23.9047H33.8816Z"
          fill="black"
        />
        <path
          d="M35.0816 23.9047H36.2816V23.2393L35.7172 22.8869L35.0816 23.9047ZM33.8816 28.423C33.8816 29.0858 34.4188 29.623 35.0816 29.623C35.7443 29.623 36.2816 29.0858 36.2816 28.423H33.8816ZM20.1456 15.9925L34.446 24.9225L35.7172 22.8869L21.4169 13.9568L20.1456 15.9925ZM33.8816 23.9047V28.423H36.2816V23.9047H33.8816Z"
          fill="url(#paint3_linear_51293_81337)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_51293_81337"
          x1="16.5015"
          y1="16.162"
          x2="-0.653575"
          y2="-1.50364"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.170588" stopColor={invertColor} stopOpacity="0.15" />
          <stop offset="0.609018" stopColor={invertColor} stopOpacity="0.35" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81337"
          x1="-1.52023e-07"
          y1="16.7964"
          x2="10.0873"
          y2="2.15701"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.499568" stopColor={invertColor} />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81337"
          x1="11.9559"
          y1="18.1932"
          x2="13.885"
          y2="0.978932"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.443473" stopColor={invertColor} stopOpacity="0.7" />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_51293_81337"
          x1="23.0308"
          y1="13.8573"
          x2="34.0971"
          y2="37.2583"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5648D0" />
          <stop offset="0.523327" stopColor="#584AD1" />
          <stop offset="0.581622" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
