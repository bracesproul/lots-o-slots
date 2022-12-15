import { ReactElement, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import type { AriaButtonProps } from '@react-types/button';
import clsx from 'clsx';

export type ButtonProps = AriaButtonProps & {
  className?: string;

  /**
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';

  children: string;

  type: 'button' | 'submit' | 'reset';
};

const DEFAULT_PROPS = {
  variant: 'primary',
};

export default function Button(props: ButtonProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };

  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(p, ref);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const behaviorProps = mergeProps(buttonProps, hoverProps);

  return (
    <button
      className={clsx([
        'button-main',
        {
          'is-hovered': isHovered,
          'is-pressed': isPressed,
          'is-secondary': p.variant === 'secondary',
        },
        p.className,
      ])}
      {...behaviorProps}
      type={p.type}
    >
      {p.children}
    </button>
  );
}
