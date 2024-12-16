import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function FashionIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.1924 22.3796C25.4343 23.552 22.5753 26.4035 21.4011 30.153C21.2177 30.7371 20.4137 30.7371 20.2304 30.153C19.0561 26.4035 16.1972 23.552 12.439 22.3796C11.8537 22.1966 11.8537 21.3945 12.439 21.2115C16.1972 20.0399 19.0561 17.1884 20.2304 13.438C20.4137 12.854 21.2177 12.854 21.4011 13.438C22.5753 17.1884 25.4343 20.0399 29.1924 21.2115C29.7778 21.3945 29.7778 22.1966 29.1924 22.3796Z"
        fill="url(#paint0_linear_51293_81404)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44.252 29.7204C41.3629 30.6217 39.1651 32.8139 38.2624 35.6964C38.1214 36.1454 37.5033 36.1454 37.3623 35.6964C36.4596 32.8139 34.2618 30.6217 31.3727 29.7204C30.9227 29.5798 30.9227 28.9631 31.3727 28.8225C34.2618 27.9218 36.4596 25.7297 37.3623 22.8465C37.5033 22.3975 38.1214 22.3975 38.2624 22.8465C39.1651 25.7297 41.3629 27.9218 44.252 28.8225C44.702 28.9631 44.702 29.5798 44.252 29.7204Z"
        fill="url(#paint1_linear_51293_81404)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.2939 40.5785C28.4391 41.1571 27.028 42.5645 26.4485 44.4151C26.358 44.7033 25.9612 44.7033 25.8707 44.4151C25.2911 42.5645 23.8801 41.1571 22.0253 40.5785C21.7364 40.4882 21.7364 40.0923 22.0253 40.002C23.8801 39.4238 25.2911 38.0164 25.8707 36.1654C25.9612 35.8772 26.358 35.8772 26.4485 36.1654C27.028 38.0164 28.4391 39.4238 30.2939 40.002C30.5828 40.0923 30.5828 40.4882 30.2939 40.5785Z"
        fill="url(#paint2_linear_51293_81404)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81404"
          x1="15.5556"
          y1="18.3333"
          x2="21.9885"
          y2="26.5258"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.142607" stopColor={invertColor} />
          <stop offset="0.814792" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81404"
          x1="34.5166"
          y1="25.1481"
          x2="40.8009"
          y2="30.271"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.24666" stopColor={invertColor} stopOpacity="0.7" />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81404"
          x1="27.9984"
          y1="38.1853"
          x2="25.1077"
          y2="43.4783"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.318045" stopColor={invertColor} stopOpacity="0.5" />
          <stop offset="0.780833" stopColor={invertColor} stopOpacity="0.25" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
