import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function InsuranceIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <path
        d="M29.4858 42.8523C32.8658 41.3228 40.8392 36.5963 40.8392 26.055V19.6867C40.8392 17.8923 40.8392 16.9936 40.4893 16.3083C40.1811 15.7041 39.6895 15.213 39.085 14.9055C38.3997 14.5557 37.5009 14.5557 35.7034 14.5557H20.296C18.4984 14.5557 17.5997 14.5557 16.9127 14.9055C16.3088 15.2133 15.8178 15.7043 15.51 16.3083C15.1602 16.9952 15.1602 17.8939 15.1602 19.6915V26.055C15.1602 36.5963 23.1335 41.3228 26.5135 42.8523C26.8714 43.016 27.0511 43.0963 27.4572 43.1653C27.714 43.2102 28.2885 43.2102 28.5437 43.1653C28.9482 43.0963 29.1263 43.016 29.4826 42.8539L29.4858 42.8523Z"
        fill="url(#paint0_linear_51293_81346)"
      />
      <path
        d="M33.9385 23.1816L27.1175 30.0026L23.707 26.5921"
        stroke="url(#paint1_linear_51293_81346)"
        strokeWidth="2.40741"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81346"
          x1="37.6293"
          y1="17.8293"
          x2="9.42797"
          y2="44.6236"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={invertColor} stopOpacity="0.6" />
          <stop offset="0.552188" stopColor={invertColor} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81346"
          x1="17.4083"
          y1="32.3698"
          x2="35.2231"
          y2="24.4253"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor="#7E73DB" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
