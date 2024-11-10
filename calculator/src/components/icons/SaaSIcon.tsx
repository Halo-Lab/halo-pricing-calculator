import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function SaaSIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <path
        d="M10.0039 32.0498C10.0039 28.3758 12.9822 25.3975 16.6562 25.3975H17.2723C18.5731 25.3975 19.85 25.7465 20.9699 26.4083L23.5258 27.9186C24.9172 28.7408 26.1925 29.7454 27.3176 30.9057L34.8777 38.7021H16.6562C12.9822 38.7021 10.0039 35.7237 10.0039 32.0498Z"
        fill="url(#paint0_linear_51293_81297)"
      />
      <path
        d="M39.5046 28.0004C39.5046 30.063 38.921 31.9894 37.91 33.6234C36.024 36.6713 32.6507 38.7019 28.8031 38.7019C22.8928 38.7019 18.1016 33.9106 18.1016 28.0004C18.1016 22.0901 22.8928 17.2988 28.8031 17.2988C34.7134 17.2988 39.5046 22.0901 39.5046 28.0004Z"
        fill="url(#paint1_linear_51293_81297)"
      />
      <path
        d="M37.91 33.6234C36.024 36.6713 32.6507 38.7019 28.8031 38.7019H40.3723L37.91 33.6234Z"
        fill="url(#paint2_linear_51293_81297)"
      />
      <circle
        cx="40.3704"
        cy="33.2063"
        r="5.49538"
        fill="url(#paint3_linear_51293_81297)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81297"
          x1="23.3085"
          y1="28.0005"
          x2="7.40083"
          y2="41.3051"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.170588" stopColor={invertColor} stopOpacity="0.15" />
          <stop offset="0.609018" stopColor={invertColor} stopOpacity="0.35" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81297"
          x1="35.4554"
          y1="38.7019"
          x2="26.9732"
          y2="20.58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.685465" stopColor={invertColor} />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81297"
          x1="35.4554"
          y1="38.7019"
          x2="26.9732"
          y2="20.58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.685465" stopColor={invertColor} />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_51293_81297"
          x1="31.9827"
          y1="38.9909"
          x2="42.543"
          y2="34.1625"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.683926" stopColor={invertColor} />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
