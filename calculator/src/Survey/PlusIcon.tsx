import { JSX } from "react";

interface PlusIconProperties {
  isMinus?: boolean;
}

export function PlusIcon({ isMinus }: PlusIconProperties): JSX.Element {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-icon
    >
      <path
        d="M10 4.16406V15.8307"
        stroke={isMinus ? "transparent" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16797 10H15.8346"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
