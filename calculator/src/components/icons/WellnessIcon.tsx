import { JSX } from "react";

import { Svg } from "../../ui/Svg";
import { IconComponentProps } from ".";

export function WellnessIcon({
  invertColor,
  ...props
}: IconComponentProps): JSX.Element {
  return (
    <Svg viewBox="0 0 56 56" {...props}>
      <circle cx="28" cy="28" r="28" fill="currentColor" />
      <path
        d="M30.8963 11.3015C31.0473 10.8827 31.4447 10.6035 31.89 10.6035H37.8837C38.6156 10.6035 39.1257 11.3298 38.8774 12.0183L34.7396 23.4911H26.5L30.8963 11.3015Z"
        fill="url(#paint0_linear_51293_81353)"
      />
      <path
        d="M25.4866 11.3015C25.3355 10.8827 24.9381 10.6035 24.4928 10.6035H18.4992C17.7673 10.6035 17.2571 11.3298 17.5054 12.0183L21.6432 23.4911H29.8828L25.4866 11.3015Z"
        fill="url(#paint1_linear_51293_81353)"
      />
      <circle
        cx="28.2966"
        cy="32.2595"
        r="12.1481"
        fill="url(#paint2_linear_51293_81353)"
      />
      <path
        d="M35.0512 31.2125L32.1916 33.68L33.0628 37.3702C33.1109 37.5705 33.0985 37.7806 33.0272 37.9739C32.956 38.1672 32.829 38.335 32.6624 38.4562C32.4958 38.5773 32.2971 38.6464 32.0912 38.6547C31.8854 38.6629 31.6817 38.61 31.5059 38.5026L28.2968 36.5276L25.0858 38.5026C24.91 38.6094 24.7066 38.6618 24.5011 38.6533C24.2956 38.6447 24.0973 38.5755 23.931 38.4544C23.7648 38.3334 23.6381 38.1658 23.5668 37.9729C23.4956 37.7799 23.4831 37.5702 23.5308 37.3702L24.4052 33.68L21.5456 31.2125C21.3901 31.0781 21.2777 30.9009 21.2223 30.703C21.1669 30.505 21.1711 30.2952 21.2342 30.0996C21.2974 29.904 21.4168 29.7314 21.5775 29.6033C21.7382 29.4751 21.9331 29.3972 22.1379 29.3792L25.8871 29.0767L27.3334 25.5766C27.4117 25.3858 27.545 25.2226 27.7162 25.1078C27.8875 24.993 28.089 24.9316 28.2952 24.9316C28.5014 24.9316 28.703 24.993 28.8742 25.1078C29.0455 25.2226 29.1787 25.3858 29.257 25.5766L30.7027 29.0767L34.4519 29.3792C34.6571 29.3965 34.8526 29.474 35.0138 29.602C35.1751 29.7299 35.2951 29.9026 35.3587 30.0984C35.4222 30.2943 35.4266 30.5045 35.3712 30.7028C35.3159 30.9011 35.2032 31.0786 35.0474 31.2131L35.0512 31.2125Z"
        fill="url(#paint3_linear_51293_81353)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_51293_81353"
          x1="35.4074"
          y1="10.6296"
          x2="28.8889"
          y2="25.1481"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={invertColor} stopOpacity="0.3" />
          <stop offset="0.507107" stopColor={invertColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_51293_81353"
          x1="21.1861"
          y1="10.6296"
          x2="22.0155"
          y2="23.0197"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={invertColor} stopOpacity="0.15" />
          <stop offset="1" stopColor={invertColor} stopOpacity="0.35" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_51293_81353"
          x1="37.1855"
          y1="18.6298"
          x2="16.2609"
          y2="50.234"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.447812" stopColor={invertColor} />
          <stop offset="0.719358" stopColor={invertColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_51293_81353"
          x1="21.1836"
          y1="18.0697"
          x2="32.1133"
          y2="19.577"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.492893" stopColor="#7E73DB" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </Svg>
  );
}
