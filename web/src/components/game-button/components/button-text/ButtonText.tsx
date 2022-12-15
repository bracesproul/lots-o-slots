import clsx from 'clsx';
import { ReactElement } from 'react';

type ButtonTextProps = {
  className?: string;
  title: string;
  noneLeft: boolean;
  noneRight: boolean;
};

export default function ButtonText(props: ButtonTextProps): ReactElement {
  const { title, noneLeft, noneRight, className } = props;
  return (
    <div
      className={clsx([
        'button-text',
        { 'none-right': noneRight, 'none-left': noneLeft },
        className,
      ])}
    >
      <span className={'text-white text-sm font-bold'}>{title}</span>
    </div>
  );
}
