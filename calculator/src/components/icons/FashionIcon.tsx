import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function FashionIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 64 64" {...props}>
      <circle cx="32" cy="31" r="28" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.1924 25.3796C29.4343 26.552 26.5753 29.4035 25.4011 33.153C25.2177 33.7371 24.4137 33.7371 24.2304 33.153C23.0561 29.4035 20.1972 26.552 16.439 25.3796C15.8537 25.1966 15.8537 24.3945 16.439 24.2115C20.1972 23.0399 23.0561 20.1884 24.2304 16.438C24.4137 15.854 25.2177 15.854 25.4011 16.438C26.5753 20.1884 29.4343 23.0399 33.1924 24.2115C33.7778 24.3945 33.7778 25.1966 33.1924 25.3796Z"
        fill="url(#paint0_linear_51293_81404)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.252 32.7204C45.3629 33.6217 43.1651 35.8139 42.2624 38.6964C42.1214 39.1454 41.5033 39.1454 41.3623 38.6964C40.4596 35.8139 38.2618 33.6217 35.3727 32.7204C34.9227 32.5798 34.9227 31.9631 35.3727 31.8225C38.2618 30.9218 40.4596 28.7297 41.3623 25.8465C41.5033 25.3975 42.1214 25.3975 42.2624 25.8465C43.1651 28.7297 45.3629 30.9218 48.252 31.8225C48.702 31.9631 48.702 32.5798 48.252 32.7204Z"
        fill="url(#paint1_linear_51293_81404)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.2939 43.5785C32.4391 44.1571 31.028 45.5645 30.4485 47.4151C30.358 47.7033 29.9612 47.7033 29.8707 47.4151C29.2911 45.5645 27.8801 44.1571 26.0253 43.5785C25.7364 43.4882 25.7364 43.0923 26.0253 43.002C27.8801 42.4238 29.2911 41.0164 29.8707 39.1654C29.9612 38.8772 30.358 38.8772 30.4485 39.1654C31.028 41.0164 32.4391 42.4238 34.2939 43.002C34.5828 43.0923 34.5828 43.4882 34.2939 43.5785Z"
        fill="url(#paint2_linear_51293_81404)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81404"
          x1="19.5556"
          y1="21.3333"
          x2="25.9885"
          y2="29.5258"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.142607" stopColor={invertColor} />
          <stop offset="0.814792" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81404"
          x1="38.5166"
          y1="28.1481"
          x2="44.8009"
          y2="33.271"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.24666" stopColor={invertColor} stopOpacity="0.7" />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81404"
          x1="31.9984"
          y1="41.1853"
          x2="29.1077"
          y2="46.4783"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.318045" stopColor={invertColor} stopOpacity="0.5" />
          <stop offset="0.780833" stopColor={invertColor} stopOpacity="0.25" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
