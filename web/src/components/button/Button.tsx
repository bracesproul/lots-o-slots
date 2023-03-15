import { ReactElement, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import type { AriaButtonProps } from '@react-types/button';
import clsx from 'clsx';

type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonProps = AriaButtonProps & {
  className?: string;

  /**
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';

  children: string;

  type?: ButtonType;

  /**
   * Whether or not the button is disabled.
   */
  isDisabled?: boolean;
  /** The button size */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
};

const DEFAULT_PROPS = {
  variant: 'primary',
  type: 'button' as ButtonType,
};

export default function Button(props: ButtonProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };

  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(p, ref);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const behaviorProps = mergeProps(buttonProps, hoverProps);

  return (
    <button
      {...behaviorProps}
      className={clsx([
        'button-main',
        {
          'is-hovered': isHovered,
          'is-pressed': isPressed,
          'is-disabled': p.isDisabled,
          'is-secondary': p.variant === 'secondary',
          'is-primary': p.variant === 'primary',
          'size-small': p.size === 'small',
          'size-medium': p.size === 'medium',
          'size-large': p.size === 'large',
          'size-xlarge': p.size === 'xlarge',
        },
        p.className,
      ])}
      type={p.type}
    >
      {p.children}
    </button>
  );
}
