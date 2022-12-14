import clsx from 'clsx';
import { ReactElement } from 'react';

export type CircleButtonProps = {
  icon: ReactElement;
  isSelected: boolean;
};

export default function CircleButton(props: CircleButtonProps): ReactElement {
  return <div className={clsx(['circle-button'])}></div>;
}
