import { Component } from "moru";

export const BrandingIcon: Component<{}> = () => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="21.1414"
        cy="10.7196"
        r="6.02425"
        fill="url(#paint0_linear_46241_30537)"
      />
      <rect
        x="7.80078"
        y="11.4688"
        width="12.0137"
        height="12.118"
        rx="0.869301"
        fill="url(#paint1_linear_46241_30537)"
      />
      <path
        d="M18.4172 18.5445C18.9987 17.5373 20.4525 17.5373 21.034 18.5445L25.5317 26.3347C26.1132 27.3419 25.3863 28.6009 24.2233 28.6009H15.2279C14.0649 28.6009 13.338 27.3419 13.9195 26.3347L18.4172 18.5445Z"
        fill="url(#paint2_linear_46241_30537)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_46241_30537"
          x1="25.8988"
          y1="5.77"
          x2="19.8458"
          y2="16.5456"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0.390982"
            stop-color="currentColor"
            stop-opacity="0.35"
          />
          <stop
            offset="0.829412"
            stop-color="currentColor"
            stop-opacity="0.15"
          />
        </linearGradient>
        <linearGradient
          id="paint1_linear_46241_30537"
          x1="5.71182"
          y1="26.3269"
          x2="22.3998"
          y2="12.2488"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0.443473"
            stop-color="currentColor"
            stop-opacity="0.7"
          />
          <stop offset="1" stop-color="currentColor" stop-opacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_46241_30537"
          x1="12.1238"
          y1="29.1654"
          x2="24.1543"
          y2="22.4348"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.683926" stop-color="currentColor" />
          <stop offset="1" stop-color="currentColor" stop-opacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );
};
