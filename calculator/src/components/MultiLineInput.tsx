import { JSX, useId } from "react";

interface MultiLineInputProperties {
  name?: string;
  label: string;
  value: string;
  onInput(value: string): void;
}

export function MultiLineInput({
  name,
  label,
  value,
  onInput,
}: MultiLineInputProperties): JSX.Element {
  const inputId = useId();

  return (
    <div className="input-wrap">
      <label htmlFor={inputId} className="form__label is--textarea">
        {label}
      </label>
      <textarea
        className="input is-textarea w-input"
        maxLength={5000}
        name={name}
        data-name={name}
        placeholder={label}
        data-input-anim
        id={inputId}
        data-lenis-prevent-off
        value={value}
        onInput={(event) => {
          onInput(event.currentTarget.value);
        }}
      />
    </div>
  );
}
