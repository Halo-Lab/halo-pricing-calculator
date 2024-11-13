import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function LinkedInIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 64 64" {...props}>
      <circle cx="32" cy="32" r="32" fill="#007EBB" />
      <circle cx="32" cy="32" r="32" stroke="#040322" />
      <g clipPath="url(#clip0_51457_6278)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 48H46C47.0609 48 48.0783 47.5786 48.8284 46.8284C49.5786 46.0783 50 45.0609 50 44V16C50 14.9391 49.5786 13.9217 48.8284 13.1716C48.0783 12.4214 47.0609 12 46 12H18C16.9391 12 15.9217 12.4214 15.1716 13.1716C14.4214 13.9217 14 14.9391 14 16V44C14 45.0609 14.4214 46.0783 15.1716 46.8284C15.9217 47.5786 16.9391 48 18 48Z"
          fill="#007EBB"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M45 43H39.658V33.901C39.658 31.406 38.71 30.0125 36.7355 30.0125C34.5875 30.0125 33.4655 31.463 33.4655 33.901V43H28.316V25.6665H33.465V28.0015C33.465 28.0015 35.013 25.137 38.6915 25.137C42.368 25.137 45 27.382 45 32.0255V43ZM22.175 23.397C20.421 23.397 19 21.965 19 20.1985C19 18.432 20.421 17 22.175 17C23.929 17 25.3485 18.432 25.3485 20.1985C25.3485 21.965 23.929 23.397 22.175 23.397ZM19.516 43H24.884V25.6665H19.5165L19.516 43Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_51457_6278">
          <rect
            width="36"
            height="36"
            fill="white"
            transform="translate(14 12)"
          />
        </clipPath>
      </defs>
    </Svg>
  );
}
