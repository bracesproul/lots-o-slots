import { ReactElement, useEffect } from 'react';
import { RedPokerChip, BlackPokerChip } from '@/assets/svgs';
import { AiOutlineLink } from 'react-icons/ai';
import clsx from 'clsx';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import type { AriaButtonProps } from '@react-types/button';
import React from 'react';

import {
  ButtonText,
  RedBackgroundRightContainer,
  RedBackgroundLeftContainer,
  IconRight,
  IconLeft,
} from './components';

export type GameButtonProps = AriaButtonProps & {
  className?: string;

  /**
   * Adds a red background around the left icon.
   * @default false
   */
  leftIconRedBackground?: boolean;

  /**
   * Adds a red background around the right icon.
   * @default false
   */
  rightIconRedBackground?: boolean;

  title: string;

  leftIconType?: 'redChip' | 'blackChip' | 'link' | 'custom' | 'none';
  rightIconType?: 'redChip' | 'blackChip' | 'link' | 'custom' | 'none';

  /**
   * Must set `iconType` to 'custom' to use this prop.
   */
  icon?: ReactElement;

  isDisabled?: boolean;
};

const DEFAULT_PROPS = {
  leftIconRedBackground: false,
  rightIconRedBackground: false,
  leftIconType: 'none',
  rightIconType: 'none',
};

export default function GameButton(props: GameButtonProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const {
    icon,
    title,
    leftIconType,
    rightIconType,
    leftIconRedBackground,
    rightIconRedBackground,
  } = p;
  const ref = React.useRef<HTMLButtonElement>(null);

  const { buttonProps, isPressed } = useButton(p, ref);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const behaviorProps = mergeProps(buttonProps, hoverProps);

  return (
    <button
      {...behaviorProps}
      className={clsx([
        `button-container`,
        {
          'is-pressed': isPressed,
          'is-hovered': isHovered,
        },
      ])}
    >
      {leftIconRedBackground && (
        <RedBackgroundLeftContainer
          icon={<IconLeft icon={leftIconType} usingBackground />}
        />
      )}
      {leftIconRedBackground === false && (
        <IconLeft icon={leftIconType} none={leftIconType === 'none'} />
      )}
      <ButtonText
        title={title}
        noneLeft={leftIconType === 'none'}
        noneRight={rightIconType === 'none'}
      />

      {rightIconRedBackground && (
        <RedBackgroundRightContainer
          icon={<IconRight icon={rightIconType} usingBackground />}
        />
      )}
      {rightIconRedBackground === false && (
        <IconRight icon={rightIconType} none={rightIconType === 'none'} />
      )}
    </button>
  );
}
