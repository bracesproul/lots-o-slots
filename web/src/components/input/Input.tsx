import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types/style-prefix';
import { HideEyeSvg, ShowEyeSvg } from '@/assets/svgs';
import { Icon } from '../icon';
import { InteractableComponent } from '../interactable-component';

export type InputProps = {
  className?: string;
  /** Custom className to override the label styling */
  labelClassName?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  /**
   * Whether or not the input is disabled
   * @default false
   */
  isDisabled?: boolean;
  id?: string;
  name?: string;
  /**
   * The type of the input
   * @default 'text'
   * */
  type?: string;
  required?: boolean;
  /** The label of the input */
  label?: string;
  /** Error message to display */
  error?: string;
  /**
   * Whether or not the input has an error
   * @default false
   * */
  hasError?: boolean;
  /**
   * Handler for the onBlur prop
   * Use this to trigger validation, onBlur is triggered
   * when the input loses focus.
   * */
  handleOnBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  /**
   * Whether or not to show the show/hide password icon button
   * @default false
   * */
  showTogglePasswordIcon?: boolean;
  /**
   * What the input should auto complete for
   */
  autoComplete?: string;
};

const PREFIX = StylePrefix.INPUT_COMPONENT;

const DEFAULT_PROPS = {
  showTogglePasswordIcon: false,
  type: 'text',
};

export default function Input(props: InputProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const [passwordInputType, setPasswordInputType] = useState<string>(p.type);

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    p.handleOnBlur?.(event);
  };

  const handleTogglePassword = () => {
    setPasswordInputType(
      passwordInputType === 'password' ? 'text' : 'password'
    );
  };

  const eyeIcon =
    passwordInputType === 'password' ? <ShowEyeSvg /> : <HideEyeSvg />;

  return (
    <div
      className={clsx([
        `${PREFIX}`,
        {
          'has-label': !!p.label,
          'has-error': p.error,
        },
      ])}
    >
      <span className={`${PREFIX}-label-container`}>
        <span className={`${PREFIX}-label-content`}>
          {p.label && (
            <p
              className={clsx([
                `${PREFIX}-label`,
                p.labelClassName,
                {
                  'has-error': p.error,
                },
              ])}
            >
              {p.label}
            </p>
          )}
          {p.required && (
            <p
              className={clsx([
                `${PREFIX}-required`,
                {
                  'has-label': !!p.label,
                },
              ])}
            >
              *
            </p>
          )}
        </span>
        {p.showTogglePasswordIcon && (
          <InteractableComponent
            onPress={handleTogglePassword}
            className={`${PREFIX}-eye-icon`}
          >
            <Icon content={eyeIcon} />
          </InteractableComponent>
        )}
      </span>
      <input
        className={clsx([
          `${PREFIX}-input`,
          p.className,
          {
            'has-error': p.error,
            'has-icon': p.showTogglePasswordIcon,
          },
        ])}
        disabled={p.isDisabled}
        name={p.name}
        id={p.id}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        placeholder={p.placeholder}
        type={passwordInputType}
        required={p.required}
        onBlur={handleBlur}
        autoComplete={p.autoComplete}
      />
      <span>
        {p.hasError && <p className={`${PREFIX}-error`}>{p.error}</p>}
      </span>
    </div>
  );
}
