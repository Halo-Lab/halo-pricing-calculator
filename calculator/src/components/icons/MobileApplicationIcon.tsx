import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function MobileApplicationIcon(props: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 40 40" {...props}>
      <rect width="40" height="40" rx="20" fill="#3827C7" />
      <rect
        width="33.9453"
        height="33.9453"
        transform="translate(2.85938 3.57129)"
        fill="#3827C7"
      />
      <circle
        cx="23.1414"
        cy="13.7254"
        r="6.02425"
        fill="url(#paint0_linear_51293_76969)"
      />
      <rect
        x="9.80078"
        y="14.4697"
        width="12.0137"
        height="12.118"
        rx="0.869301"
        fill="url(#paint1_linear_51293_76969)"
      />
      <path
        d="M20.4172 21.5474C20.9987 20.5402 22.4525 20.5402 23.034 21.5474L27.5317 29.3376C28.1132 30.3448 27.3863 31.6038 26.2233 31.6038H17.2279C16.0649 31.6038 15.338 30.3448 15.9195 29.3376L20.4172 21.5474Z"
        fill="url(#paint2_linear_51293_76969)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_76969"
          x1="27.8988"
          y1="8.77586"
          x2="21.8458"
          y2="19.5515"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.390982" stopColor="white" stopOpacity="0.35" />
          <stop offset="0.829412" stopColor="white" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_76969"
          x1="7.71182"
          y1="29.3279"
          x2="24.3998"
          y2="15.2498"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.443473" stopColor="white" stopOpacity="0.7" />
          <stop offset="1" stopColor="white" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_76969"
          x1="14.1238"
          y1="32.1683"
          x2="26.1543"
          y2="25.4377"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.683926" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
