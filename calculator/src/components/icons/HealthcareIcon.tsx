import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function HealthcareIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <path
        d="M27.9629 31.7266C24.2171 35.4723 18.1431 35.4732 14.3974 31.7275C10.6516 27.9817 10.6525 21.9077 14.3983 18.162C18.1441 14.4162 24.218 14.4153 27.9638 18.161C31.7096 21.9068 31.7087 27.9808 27.9629 31.7266Z"
        fill="url(#paint0_linear_51293_81317)"
      />
      <path
        d="M17.2846 34.6088C15.6496 32.9738 15.6496 30.323 17.2846 28.6881L27.869 18.1037C31.6153 14.3574 37.6892 14.3574 41.4354 18.1036C45.1817 21.8499 45.1817 27.9238 41.4354 31.6701L30.851 42.2545C29.216 43.8894 26.5652 43.8894 24.9302 42.2545L17.2846 34.6088Z"
        fill="url(#paint1_linear_51293_81317)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81317"
          x1="22.4903"
          y1="27.3557"
          x2="10.0945"
          y2="15.5108"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={invertColor} stopOpacity="0.3" />
          <stop offset="0.556527" stopColor={invertColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81317"
          x1="40.6697"
          y1="21.571"
          x2="27.8892"
          y2="42.4985"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={invertColor} stopOpacity="0.6" />
          <stop offset="0.552188" stopColor={invertColor} />
        </linearGradient>
      </defs>
    </Svg>
  );
}
