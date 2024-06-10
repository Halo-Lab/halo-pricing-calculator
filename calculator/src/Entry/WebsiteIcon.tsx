import { JSX } from "react";

export function WebsiteIcon(): JSX.Element {
  return (
    <svg
      data-website-icon
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5.55469"
        y="5.76562"
        width="20.4617"
        height="16.6095"
        rx="3.33524"
        fill="url(#paint0_linear_46241_30554)"
      />
      <path
        d="M16.8115 17.8038C16.6278 17.3308 17.0934 16.8649 17.5665 17.0482L27.7764 21.0038C28.2578 21.1903 28.2778 21.8641 27.8083 22.0788L24.8445 23.4345C24.1152 23.768 23.5306 24.3531 23.1976 25.0826L21.8493 28.0365C21.635 28.5061 20.9612 28.4867 20.7743 28.0055L16.8115 17.8038Z"
        fill="url(#paint1_linear_46241_30554)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_46241_30554"
          x1="7.76462"
          y1="23.2373"
          x2="22.4414"
          y2="5.68182"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.330129" stopColor="currentColor" stopOpacity="0.7" />
          <stop offset="0.906847" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_46241_30554"
          x1="16.3175"
          y1="28.4622"
          x2="24.8056"
          y2="17.7894"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="0.444792" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
