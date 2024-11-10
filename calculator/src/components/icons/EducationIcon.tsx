import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function EducationIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <path
        d="M41 25.0041C41.0039 26.9733 40.5589 28.9174 39.6988 30.6888C38.8387 32.4601 37.5862 34.0122 36.0364 35.2269C35.7437 35.4478 35.506 35.7335 35.342 36.0615C35.178 36.3895 35.0921 36.751 35.0909 37.1178V38.0042C35.0909 38.631 34.8419 39.2322 34.3987 39.6755C33.9554 40.1188 33.3542 40.3678 32.7273 40.3678H23.2729C22.646 40.3678 22.0448 40.1188 21.6016 39.6755C21.1583 39.2322 20.9093 38.631 20.9093 38.0042V37.1178C20.9083 36.7562 20.8253 36.3995 20.6667 36.0746C20.5081 35.7496 20.2779 35.4649 19.9934 35.2416C18.4468 34.0353 17.1939 32.4939 16.3291 30.7335C15.4642 28.973 15.0099 27.0394 15.0003 25.078C14.9559 18.0314 20.6582 12.1666 27.6899 12.0041C29.4235 11.9607 31.1483 12.265 32.7624 12.899C34.3765 13.533 35.8472 14.484 37.0879 15.6957C38.3285 16.9074 39.3138 18.3553 39.9857 19.9541C40.6576 21.5528 41.0025 23.2699 41 25.0041Z"
        fill="url(#paint0_linear_51293_81322)"
      />
      <path
        d="M35.0879 43.9133C35.0879 44.2267 34.9634 44.5273 34.7418 44.7489C34.5201 44.9706 34.2195 45.0951 33.9061 45.0951H22.0881C21.7746 45.0951 21.474 44.9706 21.2524 44.7489C21.0308 44.5273 20.9062 44.2267 20.9062 43.9133C20.9062 43.5998 21.0308 43.2992 21.2524 43.0776C21.474 42.856 21.7746 42.7314 22.0881 42.7314H33.9061C34.2195 42.7314 34.5201 42.856 34.7418 43.0776C34.9634 43.2992 35.0879 43.5998 35.0879 43.9133Z"
        fill="url(#paint1_linear_51293_81322)"
      />
      <path
        d="M28.0044 35.8727V29.2545M28.0044 29.2545L24.2227 25.4727M28.0044 29.2545L31.7862 25.4727"
        stroke="url(#paint2_linear_51293_81322)"
        strokeWidth="2.45817"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81322"
          x1="17.5088"
          y1="43.4583"
          x2="32.2231"
          y2="19.9675"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.570052" stopColor={invertColor} />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81322"
          x1="19.8293"
          y1="41.3932"
          x2="32.7364"
          y2="47.5885"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.443473" stopColor={invertColor} stopOpacity="0.7" />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81322"
          x1="22.936"
          y1="26.1625"
          x2="29.1314"
          y2="32.616"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.413403" stopColor="#9086E6" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
