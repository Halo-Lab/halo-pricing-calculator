import { JSX, PropsWithChildren } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary-on-light"
  | "secondary-on-dark";

interface ButtonProperties extends PropsWithChildren {
  type?: "button" | "submit" | "reset";
  class?: string;
  variant: ButtonVariant;
  disabled?: boolean;
  onClick?(): void;
}

const BUTTON_STATIC_CLASSES = "button";
const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "",
  "secondary-on-light": "is-border-grey",
  "secondary-on-dark": "is-border-white",
};

export function Button({
  type = "button",
  class: className,
  variant,
  disabled,
  onClick,
  children,
}: ButtonProperties): JSX.Element {
  return (
    <button
      type={type}
      className={`${BUTTON_STATIC_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${className ?? ""}`}
      data-hover=""
      disabled={disabled}
      onClick={onClick}
    >
      <div className="button__overflow">
        <div data-hover-elem="" className="button__texts">
          <div className="button__text">{children}</div>
          <div className="button__text is-absolute">{children}</div>
        </div>
      </div>
    </button>
  );
}
