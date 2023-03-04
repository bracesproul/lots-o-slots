import clsx from 'clsx';
import React, { ReactElement, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import type { AriaButtonProps } from '@react-types/button';

export type IconBackgroundOptions =
  | 'white'
  | 'purple'
  | 'green'
  | 'gradient'
  | 'yellow'
  | 'blue';

export type CircleButtonProps = AriaButtonProps & {
  icon: ReactElement;
  isSelected: boolean;

  /**
   * Color for background around icon.
   * @default 'white'
   */
  iconBackground?: IconBackgroundOptions;
};

const DEFAULT_PROPS = {
  iconBackground: 'white',
  isSelected: false,
};

export default function CircleButton(props: CircleButtonProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };

  const isPurpleBg = props.iconBackground === 'purple';
  const isGreenBg = props.iconBackground === 'green';
  const isGradientBg = props.iconBackground === 'gradient';
  const isYellowBg = props.iconBackground === 'yellow';
  const isBlueBg = props.iconBackground === 'blue';

  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(p, ref);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const behaviorProps = mergeProps(buttonProps, hoverProps);

  return (
    <div
      {...behaviorProps}
      className={clsx([
        `circle-button`,
        {
          'is-selected': p.isSelected,
          'is-hovered': isHovered,
        },
      ])}
    >
      <div
        className={clsx([
          'circle-icon',
          {
            'bg-purple': isPurpleBg,
            'bg-green': isGreenBg,
            'bg-gradient': isGradientBg,
            'bg-yellow': isYellowBg,
            'bg-blue': isBlueBg,
          },
        ])}
      >
        {p.icon}
      </div>
    </div>
  );
}
