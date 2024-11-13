import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function HeartIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <g clipPath="url(#clip0_51457_6287)">
        <circle cx="16" cy="16" r="16" fill="currentColor" />
        <circle cx="15.5" cy="16.5" r="0.5" fill="currentColor" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.8921 12.0746C21.2044 11.3865 20.2715 11 19.2988 11C18.326 11 17.3931 11.3865 16.7054 12.0746L15.9988 12.7812L15.2921 12.0746C13.8599 10.6423 11.5377 10.6423 10.1054 12.0746C8.67319 13.5068 8.67319 15.829 10.1054 17.2612L10.8121 17.9679L15.9988 23.1545L21.1854 17.9679L21.8921 17.2612C22.5801 16.5735 22.9667 15.6406 22.9667 14.6679C22.9667 13.6951 22.5801 12.7622 21.8921 12.0746Z"
          stroke={invertColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_51457_6287">
          <rect width="32" height="32" rx="16" fill="currentColor" />
        </clipPath>
      </defs>
    </Svg>
  );
}
