import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function WellnessIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 64 64" {...props}>
      <circle cx="32" cy="31" r="28" fill="currentColor" />
      <path
        d="M34.8963 14.3015C35.0473 13.8827 35.4447 13.6035 35.89 13.6035H41.8837C42.6156 13.6035 43.1257 14.3298 42.8774 15.0183L38.7396 26.4911H30.5L34.8963 14.3015Z"
        fill="url(#paint0_linear_51293_81353)"
      />
      <path
        d="M29.4866 14.3015C29.3355 13.8827 28.9381 13.6035 28.4928 13.6035H22.4992C21.7673 13.6035 21.2571 14.3298 21.5054 15.0183L25.6432 26.4911H33.8828L29.4866 14.3015Z"
        fill="url(#paint1_linear_51293_81353)"
      />
      <circle
        cx="32.2966"
        cy="35.2595"
        r="12.1481"
        fill="url(#paint2_linear_51293_81353)"
      />
      <path
        d="M39.0512 34.2125L36.1916 36.68L37.0628 40.3702C37.1109 40.5705 37.0985 40.7806 37.0272 40.9739C36.956 41.1672 36.829 41.335 36.6624 41.4562C36.4958 41.5773 36.2971 41.6464 36.0912 41.6547C35.8854 41.6629 35.6817 41.61 35.5059 41.5026L32.2968 39.5276L29.0858 41.5026C28.91 41.6094 28.7066 41.6618 28.5011 41.6533C28.2956 41.6447 28.0973 41.5755 27.931 41.4544C27.7648 41.3334 27.6381 41.1658 27.5668 40.9729C27.4956 40.7799 27.4831 40.5702 27.5308 40.3702L28.4052 36.68L25.5456 34.2125C25.3901 34.0781 25.2777 33.9009 25.2223 33.703C25.1669 33.505 25.1711 33.2952 25.2342 33.0996C25.2974 32.904 25.4168 32.7314 25.5775 32.6033C25.7382 32.4751 25.9331 32.3972 26.1379 32.3792L29.8871 32.0767L31.3334 28.5766C31.4117 28.3858 31.545 28.2226 31.7162 28.1078C31.8875 27.993 32.089 27.9316 32.2952 27.9316C32.5014 27.9316 32.703 27.993 32.8742 28.1078C33.0455 28.2226 33.1787 28.3858 33.257 28.5766L34.7027 32.0767L38.4519 32.3792C38.6571 32.3965 38.8526 32.474 39.0138 32.602C39.1751 32.7299 39.2951 32.9026 39.3587 33.0984C39.4222 33.2943 39.4266 33.5045 39.3712 33.7028C39.3159 33.9011 39.2032 34.0786 39.0474 34.2131L39.0512 34.2125Z"
        fill="url(#paint3_linear_51293_81353)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81353"
          x1="39.4074"
          y1="13.6296"
          x2="32.8889"
          y2="28.1481"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={invertColor} stopOpacity="0.3" />
          <stop offset="0.507107" stopColor={invertColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81353"
          x1="25.1861"
          y1="13.6296"
          x2="26.0155"
          y2="26.0197"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={invertColor} stopOpacity="0.15" />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.35" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81353"
          x1="41.1855"
          y1="21.6298"
          x2="20.2609"
          y2="53.234"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.447812" stopColor={invertColor} />
          <stop offset="0.719358" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_51293_81353"
          x1="25.1836"
          y1="21.0697"
          x2="36.1133"
          y2="22.577"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor="#7E73DB" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
