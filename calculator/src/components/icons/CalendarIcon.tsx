import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function CalendarIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <g clipPath="url(#clip0_51457_6238)">
        <circle cx="16" cy="16" r="16" fill="currentColor" />
        <circle cx="15.5" cy="16.5" r="0.5" fill="currentColor" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 11.9974C10 11.261 10.597 10.6641 11.3333 10.6641H20.6667C21.403 10.6641 22 11.261 22 11.9974V21.3307C22 22.0671 21.403 22.6641 20.6667 22.6641H11.3333C10.597 22.6641 10 22.0671 10 21.3307V11.9974Z"
          stroke={invertColor}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.6641 9.33594V12.0026"
          stroke={invertColor}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3359 9.33594V12.0026"
          stroke={invertColor}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 14.6641H22"
          stroke={invertColor}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_51457_6238">
          <rect width="32" height="32" rx="16" fill="currentColor" />
        </clipPath>
      </defs>
    </Svg>
  );
}
