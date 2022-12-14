import clsx from 'clsx';
import { ReactElement, useState, useRef } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
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

  /**
   * Only use if using in a 'radio button' format.
   */
  isSelected?: boolean;

  image: 'cards' | 'slots';
};

export default function ButtonCard(props: ButtonCardProps): ReactElement {
  const p = { ...props };
  const [selected, setSelected] = useState(p.isSelected ?? false);
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(p, ref);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const behaviorProps = mergeProps(buttonProps, hoverProps);

  return (
    <div
      {...behaviorProps}
      className={clsx([
        'button-card-main',
        {
          'is-selected': p.isSelected || selected,
          'is-hovered': isHovered,
          'is-pressed': isPressed,
        },
        p.className,
      ])}
      onClick={() => setSelected(!selected)}
    >
      <div className={'playing-cards-container'}>
        {p.image === 'cards' ? <PlayingCards /> : <SlotsSvg />}
      </div>
      <h3
        className={clsx([
          'title',
          {
            'is-selected': p.isSelected || selected,
            'is-hovered': isHovered,
            'is-pressed': isPressed,
          },
        ])}
      >
        {p.title}
      </h3>
    </div>
  );
}
