import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function WebsiteIcon(props: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 40 40" {...props}>
      <rect width="40" height="40" rx="20" fill="#3827C7" />
      <rect
        width="30.5508"
        height="30.5508"
        transform="translate(4.55469 6.69727)"
        fill="#3827C7"
      />
      <rect
        x="9.55469"
        y="11.7666"
        width="20.4617"
        height="16.6095"
        rx="3.33524"
        fill="url(#paint0_linear_51293_76955)"
      />
      <path
        d="M20.8115 23.8038C20.6278 23.3308 21.0934 22.8649 21.5665 23.0482L31.7764 27.0038C32.2578 27.1903 32.2778 27.8641 31.8083 28.0788L28.8445 29.4345C28.1152 29.768 27.5306 30.3531 27.1976 31.0826L25.8493 34.0365C25.635 34.5061 24.9612 34.4867 24.7743 34.0055L20.8115 23.8038Z"
        fill="url(#paint1_linear_51293_76955)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_76955"
          x1="11.7646"
          y1="29.2382"
          x2="26.4414"
          y2="11.6828"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.330129" stopColor="white" stopOpacity="0.7" />
          <stop offset="0.906847" stopColor="white" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_76955"
          x1="20.3175"
          y1="34.4622"
          x2="28.8056"
          y2="23.7894"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.444792" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
