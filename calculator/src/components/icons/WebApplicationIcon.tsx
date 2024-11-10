import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function WebApplicationIcon(props: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 40 40" {...props}>
      <rect width="40" height="40" rx="20" fill="#3827C7" />
      <rect
        width="30.5508"
        height="30.5508"
        transform="translate(4.55469 4.55469)"
        fill="#3827C7"
      />
      <path
        d="M9.60547 18.1758H22.3794V29.5156H12.9407C11.0987 29.5156 9.60547 28.0224 9.60547 26.1804V18.1758Z"
        fill="url(#paint0_linear_51293_76963)"
      />
      <path
        d="M22.3828 18.1758H30.0205V26.1804C30.0205 28.0224 28.5273 29.5156 26.6853 29.5156H22.3828V18.1758Z"
        fill="url(#paint1_linear_51293_76963)"
      />
      <path
        d="M9.60547 13.4905C9.60547 11.6485 11.0987 10.1553 12.9407 10.1553H26.6819C28.5239 10.1553 30.0171 11.6485 30.0171 13.4905V18.1765H9.60547V13.4905Z"
        fill="url(#paint2_linear_51293_76963)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_76963"
          x1="11.0896"
          y1="30.7997"
          x2="18.8441"
          y2="17.1585"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.24666" stopColor="white" stopOpacity="0.7" />
          <stop offset="1" stopColor="white" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_76963"
          x1="30.0205"
          y1="20.5438"
          x2="19.8063"
          y2="24.8796"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.35" />
          <stop offset="1" stopColor="white" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_76963"
          x1="11.4315"
          y1="20.261"
          x2="28.1077"
          y2="9.2214"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.142607" stopColor="white" />
          <stop offset="0.814792" stopColor="white" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
