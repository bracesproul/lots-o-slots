import { ReactElement } from 'react';
import { BackgroundContainerProps } from '../../types';
import clsx from 'clsx';

export default function RedBackgroundRightContainer(
  props: BackgroundContainerProps
): ReactElement {
  const { icon, isPressed, isHovered } = props;
  return (
    <div
      className={clsx([
        'bg-container',
        {
          'is-pressed': isPressed,
          'is-hovered': isHovered,
        },
      ])}
    >
      <div className={'icon-container'}>{icon}</div>
    </div>
  );
}
