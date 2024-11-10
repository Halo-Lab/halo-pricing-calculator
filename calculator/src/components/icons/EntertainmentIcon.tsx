import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function EntertainmentIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <path
        d="M27.2791 30.2469C25.5752 29.2632 25.5752 26.8038 27.2791 25.82L39.1638 18.9584C40.8678 17.9746 42.9976 19.2043 42.9976 21.1718L42.9976 34.8951C42.9976 36.8626 40.8678 38.0923 39.1638 37.1086L27.2791 30.2469Z"
        fill="url(#paint0_linear_51293_81412)"
      />
      <rect
        x="13.4961"
        y="16.3711"
        width="22.6395"
        height="23.3256"
        rx="4.11628"
        fill="url(#paint1_linear_51293_81412)"
      />
      <path
        d="M18.2969 21.5176H24.1283"
        stroke="#D94848"
        strokeWidth="2.74419"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.2969 21.5176H24.1283"
        stroke="url(#paint2_linear_51293_81412)"
        strokeWidth="2.74419"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81412"
          x1="22.998"
          y1="27.999"
          x2="52.748"
          y2="27.999"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.349658" stopColor={invertColor} stopOpacity="0.3" />
          <stop offset="0.623184" stopColor={invertColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81412"
          x1="14.4961"
          y1="20.9995"
          x2="36.2731"
          y2="30.6921"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0751289" stopColor={invertColor} stopOpacity="0.6" />
          <stop offset="0.722953" stopColor={invertColor} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81412"
          x1="18.2969"
          y1="21.0176"
          x2="21.1469"
          y2="23.2286"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor="#7E73DB" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
