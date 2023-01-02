import { ReactElement, useRef } from 'react';
import clsx from 'clsx';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import type { AriaButtonProps } from '@react-types/button';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

export type BadgeProps = AriaButtonProps & {
  className?: string;

  /** The badge content */
  title?: string;

  /**
   * If the badge is rounded full
   * @default true
   */
  isPill?: boolean;

  /** If the badge is disabled */
  isDisabled?: boolean;

  /**
   * Badge color variants
   * @default 'default'
   */
  variant?: BadgeVariant;

  /** The badge content as child */
  children?: React.ReactElement | string;
};

const DEFAULT_PROPS = {
  variant: 'default',
  isPill: true,
};

const PREFIX = 'badge';

export default function Badge(props: BadgeProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const ref = useRef<HTMLDivElement>(null);
  const { buttonProps, isPressed } = useButton(p, ref);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const mergedProps = mergeProps(buttonProps, hoverProps);

  const isInteractable = p.onPress;

  return (
    <div
      className={clsx([
        `${PREFIX}`,
        p.className,
        {
          'is-pill': p.isPill,
          'is-hovered': isInteractable && isHovered,
          'is-pressed': isInteractable && isPressed,
          'is-disabled': p.isDisabled,
          'is-primary': p.variant === 'primary',
          'is-secondary': p.variant === 'secondary',
          'is-success': p.variant === 'success',
          'is-danger': p.variant === 'danger',
          'is-warning': p.variant === 'warning',
          'is-info': p.variant === 'info',
        },
      ])}
      {...mergedProps}
    >
      {p.title ? <p className={`${PREFIX}-title`}>{p.title}</p> : p.children}
    </div>
  );
}
