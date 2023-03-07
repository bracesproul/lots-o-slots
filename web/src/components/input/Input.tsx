import { ReactElement } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types/style-prefix';

type OnBlurType = FocusEvent<HTMLInputElement, Element>;

export type InputProps = {
  className?: string;
  /** Custom className to override the label styling */
  labelClassName?: string;
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
  /**
   * Handler for the onBlur prop 
   * Use this to trigger validation, onBlur is triggered
   * when the input loses focus.
   * */
  handleOnBlur?: (event: NewType) => void;
};

const PREFIX = StylePrefix.INPUT_COMPONENT;

export default function Input(props: InputProps): ReactElement {
  const p = { ...props };
  return (
    <div className={clsx([`${PREFIX}`, {
      'has-label': !!p.label,
      'has-error': p.error,
    }])}>
      <span className={`${PREFIX}-label-container`}>
        {p.label && <p className={clsx([`${PREFIX}-label`, p.labelClassName, {
          'has-error': p.error,
        }])}>{p.label}</p>}
        {p.required && <p className={clsx([`${PREFIX}-required`, {
          'has-label': !!p.label,
        }])}>*</p>}
      </span>
      <input
        className={clsx([`${PREFIX}-input`, p.className, {
          'has-error': p.error,
        }])}
        disabled={p.isDisabled}
        name={p.name}
        id={p.id}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        placeholder={p.placeholder}
        type={p.type}
        required={p.required}
        onBlur={(e) => console.log(e.target.value)}
      />
      <span>
        {p.hasError && <p className={`${PREFIX}-error`}>{p.error}</p>}
      </span>
    </div>

  );
}
