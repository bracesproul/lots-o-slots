import { ReactElement } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types/style-prefix';

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
  /** The label of the input */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Whether or not the input has an error */
  hasError?: boolean;
};

const PREFIX = StylePrefix.INPUT_COMPONENT;

export default function Input(props: InputProps): ReactElement {
  const p = { ...props };
  return (
    <div className={clsx([`${PREFIX}`, p.className, {
      'has-label': !!p.label,
    }])}>
      <span className={`${PREFIX}-label-container`}>
        {p.label && <p className={`${PREFIX}-label`}>{p.label}</p>}
        {p.required && <p className={clsx([`${PREFIX}-required`, {
          'has-label': !!p.label,
        }])}>*</p>}
      </span>
      <input
        className={clsx([`${PREFIX}-input`, p.className])}
        disabled={p.isDisabled}
        name={p.name}
        id={p.id}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        placeholder={p.placeholder}
        type={p.type}
        required={p.required}
      />
      <span>
        {p.hasError && <p className={`${PREFIX}-error`}>{p.error}</p>}
      </span>
    </div>

  );
}
