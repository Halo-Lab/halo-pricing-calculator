import { Component, Getter, memo } from "moru";

interface PlusIconProperties {
  isMinus?: Getter<boolean>;
}

export const PlusIcon: Component<PlusIconProperties> = ({ isMinus }) => {
  const verticalLineColour = memo(
    () => {
      return isMinus?.() ? "transparent" : "currentColor";
    },
    isMinus ? [isMinus] : undefined,
  );

  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-icon
    >
      <path
        d="M10 4.16406V15.8307"
        stroke={verticalLineColour}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.16797 10H15.8346"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
