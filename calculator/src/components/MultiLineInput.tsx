import { JSX, Component, Getter } from "moru";

import { createId } from "../id.js";

interface MultiLineInputProperties
  extends Pick<JSX.HTMLTextAriaAttributes, "name" | "prop:value" | "on:input"> {
  label: string | Getter<string>;
}

export const MultiLineInput: Component<MultiLineInputProperties> = ({
  name,
  label,
  ...properties
}) => {
  const inputId = createId();

  return (
    <div class="input-wrap">
      <label for={inputId} class="form__label is--textarea">
        {label}
      </label>
      <textarea
        class="input is-textarea w-input"
        maxlength="5000"
        name={name}
        data-name={name}
        placeholder={label}
        data-input-anim
        id={inputId}
        data-lenis-prevent-off
        {...properties}
      />
    </div>
  );
};
