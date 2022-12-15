import clsx from 'clsx';
import { ReactElement, useRef } from 'react';
import type { AriaButtonProps } from '@react-types/button';
import { PlayingCards, SlotsSvg } from '@/assets/svgs';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';

export type ButtonCardProps = AriaButtonProps & {
  className?: string;

  /**
   * The title of the accordion
   */
  title: string;

  isSelected: boolean;

  image: 'cards' | 'slots';
};

export default function ButtonCard(props: ButtonCardProps): ReactElement {
  const p = { ...props };
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(p, ref);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const behaviorProps = mergeProps(buttonProps, hoverProps);

  return (
    <div
      {...behaviorProps}
      className={clsx([
        'button-card-main',
        {
          'is-selected': p.isSelected,
          'is-hovered': isHovered,
        },
        p.className,
      ])}
    >
      <div className={'playing-cards-container'}>
        {p.image === 'cards' ? <PlayingCards /> : <SlotsSvg />}
      </div>
      <div className={'button-card-title-container'}>
        <h3
          className={clsx([
            'button-card-title',
            {
              'is-selected': p.isSelected,
              'is-hovered': isHovered,
            },
          ])}
        >
          {p.title}
        </h3>
      </div>
    </div>
  );
}
