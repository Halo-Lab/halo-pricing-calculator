import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function RealEstateIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <circle cx="30" cy="30" r="28" fill="currentColor" />
      <path
        d="M44.4492 27.1071C44.4492 25.8614 43.62 24.768 42.4204 24.4322L34.0871 22.0988C32.3158 21.6029 30.5603 22.9343 30.5603 24.7737V41.6669C30.5603 43.201 31.804 44.4447 33.3381 44.4447H41.6714C43.2056 44.4447 44.4492 43.201 44.4492 41.6669V27.1071Z"
        fill="url(#paint0_linear_51293_81363)"
      />
      <path
        d="M16.1133 22.6773C16.1133 21.4247 16.9517 20.327 18.1602 19.9974L30.938 16.5126C32.705 16.0306 34.4466 17.3609 34.4466 19.1925V41.6668C34.4466 43.2009 33.203 44.4446 31.6688 44.4446H18.8911C17.3569 44.4446 16.1133 43.2009 16.1133 41.6668V22.6773Z"
        fill="url(#paint1_linear_51293_81363)"
      />
      <path
        d="M24.4453 26.1113V31.6669H28.3342"
        stroke="url(#paint2_linear_51293_81363)"
        strokeWidth="2.22222"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81363"
          x1="32.227"
          y1="29.7224"
          x2="45.3665"
          y2="30.6745"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={invertColor} stopOpacity="0.3" />
          <stop offset="0.507107" stopColor={invertColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81363"
          x1="31.9873"
          y1="13.7941"
          x2="3.70434"
          y2="36.0338"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.434916" stopColor={invertColor} />
          <stop offset="0.655581" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81363"
          x1="28.612"
          y1="33.8891"
          x2="24.7231"
          y2="25.8336"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.198225" stopColor="#7E73DB" />
          <stop offset="0.745671" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
