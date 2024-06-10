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
      <label htmlFor={id} className="form__label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="input w-input"
        maxLength={256}
        name={name}
        data-name={name}
        placeholder={label}
        data-input-anim
        value={value}
        required={required}
        onInput={(event) => {
          onInput(event.currentTarget.value);
        }}
      />
    </div>
  );
}
