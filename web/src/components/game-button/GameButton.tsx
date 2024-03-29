import { ReactElement } from 'react';
import clsx from 'clsx';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import type { AriaButtonProps } from '@react-types/button';
import React from 'react';
import { AriaTextFieldProps } from '@react-types/textfield';

import {
  ButtonText,
  RedBackgroundRightContainer,
  RedBackgroundLeftContainer,
  IconRight,
  IconLeft,
} from './components';

export type GameButtonProps = AriaButtonProps &
  AriaTextFieldProps & {
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

    title?: string;

    leftIconType?: 'redChip' | 'blackChip' | 'link' | 'custom' | 'none';
    rightIconType?: 'redChip' | 'blackChip' | 'link' | 'custom' | 'none';

    /**
     * Must set `iconType` to 'custom' to use this prop.
     */
    icon?: ReactElement;

    isDisabled?: boolean;

    /**
     * Whether or not the button is an input.
     */
    isInput?: boolean;

    /**
     * Input box placeholder text.
     */
    placeholder?: string;

    selected?: boolean;
  };

const DEFAULT_PROPS = {
  leftIconRedBackground: false,
  rightIconRedBackground: false,
  leftIconType: 'none',
  rightIconType: 'none',
  isInput: false,
};

function AsButton(props: GameButtonProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const {
    title,
    leftIconType,
    rightIconType,
    leftIconRedBackground,
    rightIconRedBackground,
    selected,
  } = p;
  const ref = React.useRef<HTMLButtonElement>(null);

  const { buttonProps, isPressed } = useButton(p, ref);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const behaviorProps = mergeProps(buttonProps, hoverProps);

  return (
    <button
      className={clsx([
        `button-container`,
        {
          'is-pressed': isPressed,
          'is-hovered': isHovered,
          'is-selected': selected,
        },
        p.className,
      ])}
      {...behaviorProps}
    >
      {leftIconRedBackground && (
        <RedBackgroundLeftContainer
          isPressed={isPressed}
          isHovered={isHovered}
          icon={<IconLeft icon={leftIconType} usingBackground />}
        />
      )}
      {leftIconRedBackground === false && (
        <IconLeft icon={leftIconType} none={leftIconType === 'none'} />
      )}
      <ButtonText
        className={clsx([
          `button-text`,
          {
            'is-pressed': isPressed,
            'is-hovered': isHovered,
          },
        ])}
        title={title ?? ''}
        noneLeft={leftIconType === 'none'}
        noneRight={rightIconType === 'none'}
      />

      {rightIconRedBackground && (
        <RedBackgroundRightContainer
          isPressed={isPressed}
          isHovered={isHovered}
          icon={<IconRight icon={rightIconType} usingBackground />}
        />
      )}
      {rightIconRedBackground === false && (
        <IconRight icon={rightIconType} none={rightIconType === 'none'} />
      )}
    </button>
  );
}

function AsInput(props: GameButtonProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const {
    leftIconType,
    rightIconType,
    leftIconRedBackground,
    rightIconRedBackground,
    placeholder,
  } = p;

  return (
    <div className={clsx([`button-container`, p.className])}>
      {leftIconRedBackground && (
        <RedBackgroundLeftContainer
          isPressed={false}
          isHovered={false}
          icon={<IconLeft icon={leftIconType} usingBackground />}
        />
      )}
      {leftIconRedBackground === false && (
        <IconLeft icon={leftIconType} none={leftIconType === 'none'} />
      )}
      <input
        className={clsx(['input'])}
        type="text"
        placeholder={placeholder}
      />

      {rightIconRedBackground && (
        <RedBackgroundRightContainer
          isPressed={false}
          isHovered={false}
          icon={<IconRight icon={rightIconType} usingBackground />}
        />
      )}
      {rightIconRedBackground === false && (
        <IconRight icon={rightIconType} none={rightIconType === 'none'} />
      )}
    </div>
  );
}

export default function GameButton(props: GameButtonProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const { isInput } = p;

  return <>{isInput ? <AsInput {...props} /> : <AsButton {...props} />}</>;
}
