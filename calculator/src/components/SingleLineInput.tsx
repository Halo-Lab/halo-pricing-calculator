import { JSX, useId } from "react";

interface SingleLineInputProperties {
  type: string;
  name?: string;
  value: string;
  label: string;
  required?: boolean;
  onInput(value: string): void;
}

export function SingleLineInput({
  type,
  name,
  value,
  label,
  onInput,
  required,
}: SingleLineInputProperties): JSX.Element {
  const id = useId();

  return (
    <div className="input-wrap">
      <input
        id={id}
        type={type}
        className="input w-input"
        maxLength={256}
        name={name}
        data-name={name}
        placeholder={label}
        data-input-anim=""
        value={value}
        required={required}
        onInput={(event) => {
          onInput(event.currentTarget.value);
        }}
      />
      <label htmlFor={id} className="form__label">
        {label}
        {required && <span className="text-color-red">*</span>}
      </label>
    </div>
  );
}
