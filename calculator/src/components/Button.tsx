import { JSX, Component, memo, isGetter } from "moru";

export type ButtonVariant =
  | "primary"
  | "secondary-on-light"
  | "secondary-on-dark";

interface ButtonProperties extends JSX.HTMLButtonAttributes {
  variant: ButtonVariant;
}

const BUTTON_STATIC_CLASSES = "button is-small-simple";
const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "",
  "secondary-on-light": "is-border-grey",
  "secondary-on-dark": "is-border-white",
};

export const Button: Component<ButtonProperties> = ({
  type = "button",
  class: className,
  variant,
  children,
  ...properties
}) => {
  const classes = isGetter(className)
    ? memo(() => {
        return className(
          (value) =>
            `${BUTTON_STATIC_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${value}`,
        );
      }, [className])
    : `${BUTTON_STATIC_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${className ?? ""}`;

  return (
    <button type={type} class={classes} data-hover {...properties}>
      <div class="button__overflow">
        <div data-hover-elem class="button__texts">
          <div class="button__text">{children}</div>
          <div class="button__text is-absolute">{children}</div>
        </div>
      </div>
    </button>
  );
};
