import React, { ReactElement, useRef } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types/style-prefix';
import { useSearchFieldState } from 'react-stately';
import { AriaSearchFieldProps, useSearchField } from 'react-aria';

export type SearchFieldProps = AriaSearchFieldProps & {
  className?: string;
  /** Custom className to override the label styling */
  labelClassName?: string;
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

const PREFIX = StylePrefix.SEARCH_FIELD;

const DEFAULT_PROPS = {
  showTogglePasswordIcon: false,
  type: 'text',
};

export default function SearchField(props: SearchFieldProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const { label } = props;
  const state = useSearchFieldState(props);
  const ref = React.useRef(null);
  const { labelProps, inputProps } = useSearchField(props, state, ref);

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    p.handleOnBlur?.(event);
  };

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
      <span className={`${PREFIX}-label-content`}>
        {p.label && (
          <label
            {...labelProps}
            className={clsx([
              `${PREFIX}-label`,
              p.labelClassName,
              {
                'has-error': p.error,
              },
            ])}
          >
            {p.label}
          </label>
        )}
      </span>
      <input
        {...inputProps}
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
        placeholder={p.placeholder}
        onBlur={handleBlur}
        autoComplete={p.autoComplete}
        ref={ref}
      />
      <span>
        {p.hasError && <p className={`${PREFIX}-error`}>{p.error}</p>}
      </span>
    </div>
  );
}
