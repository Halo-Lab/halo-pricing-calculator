import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function OpenBookIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <g clipPath="url(#clip0_51457_6262)">
        <circle cx="16" cy="16" r="16" fill="currentColor" />
        <circle cx="15.5" cy="16.5" r="0.5" fill="currentColor" />
        <path
          d="M22.6667 11H18.6667C17.9594 11 17.2811 11.281 16.781 11.781C16.281 12.2811 16 12.9594 16 13.6667V23C16 22.4696 16.2107 21.9609 16.5858 21.5858C16.9609 21.2107 17.4696 21 18 21H22.6667V11Z"
          stroke={invertColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.33594 11H13.3359C14.0432 11 14.7215 11.281 15.2216 11.781C15.7217 12.2811 16.0026 12.9594 16.0026 13.6667V23C16.0026 22.4696 15.7919 21.9609 15.4168 21.5858C15.0417 21.2107 14.533 21 14.0026 21H9.33594V11Z"
          stroke={invertColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_51457_6262">
          <rect width="32" height="32" rx="16" fill="currentColor" />
        </clipPath>
      </defs>
    </Svg>
  );
}
