import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function OtherIndustriesIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <mask
        id="mask0_51293_81329"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="13"
        y="11"
        width="30"
        height="34"
      >
        <path
          d="M13.7041 20.7241C13.7041 20.1193 14.0269 19.5605 14.5507 19.2582L27.1475 11.9895C27.6714 11.6872 28.3168 11.6875 28.8405 11.9902L41.439 19.273C41.9623 19.5755 42.2845 20.134 42.2845 20.7384V35.2509C42.2845 35.8556 41.9619 36.4144 41.4381 36.7167L28.8389 43.99C28.3159 44.292 27.6716 44.2923 27.1482 43.991L14.5513 36.7385C14.0265 36.4364 13.7031 35.877 13.7032 35.2716L13.7041 20.7241Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_51293_81329)">
        <rect
          width="16.5015"
          height="16.5015"
          transform="matrix(-0.866025 0.5 0 -1 42.2852 36.25)"
          fill="url(#paint0_linear_51293_81329)"
        />
        <rect
          width="16.5015"
          height="16.5015"
          transform="matrix(-0.866025 -0.5 0 -1 27.9922 44.499)"
          fill="url(#paint1_linear_51293_81329)"
        />
        <rect
          width="16.5015"
          height="16.5015"
          transform="matrix(-0.866025 -0.5 0.866025 -0.5 27.9922 28.0029)"
          fill="url(#paint2_linear_51293_81329)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_51293_81329"
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
          id="paint1_linear_51293_81329"
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
          id="paint2_linear_51293_81329"
          x1="11.9559"
          y1="18.1932"
          x2="13.885"
          y2="0.978932"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.443473" stopColor={invertColor} stopOpacity="0.7" />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
