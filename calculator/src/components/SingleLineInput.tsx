import { JSX, Component, Getter } from "moru";

import { createId } from "../id.js";

interface SingleLineInputProperties
  extends Pick<
    JSX.HTMLInputAttributes,
    "type" | "name" | "required" | "on:input" | "prop:value"
  > {
  label: string | Getter<string>;
}

export const SingleLineInput: Component<SingleLineInputProperties> = ({
  name,
  label,
  ...properties
}) => {
  const id = createId();

  return (
    <div class="input-wrap">
      <label for={id} class="form__label">
        {label}
      </label>
      <input
        id={id}
        class="input w-input"
        maxlength="256"
        name={name}
        data-name={name}
        placeholder={label}
        data-input-anim
        {...properties}
      />
    </div>
  );
};
