import { ReactElement } from 'react';
import clsx from 'clsx';

export type InputProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  id?: string;
  name?: string;
  type?: string;
  required?: boolean;
};

const PREFIX = 'input-component';

export default function Input(props: InputProps): ReactElement {
  const p = { ...props };
  return (
    <input
      className={clsx([`${PREFIX}`, p.className])}
      disabled={p.isDisabled}
      name={p.name}
      id={p.id}
      value={p.value}
      onChange={(e) => p.onChange(e.target.value)}
      placeholder={p.placeholder}
      type={p.type}
      required={p.required}
    />
  );
}
