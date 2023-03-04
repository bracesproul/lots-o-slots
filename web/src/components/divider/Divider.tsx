import { StylePrefix } from '@/types/style-prefix';
import clsx from 'clsx';
import { ReactElement } from 'react';

export type DividerProps = {
  /** Optional class name to apply styles */
  className?: string;
  /**
   * Location of the divider
   * @default 'middle'
   * */
  location?: 'middle' | 'left' | 'right';
};

const PREFIX = StylePrefix.DIVIDER_COMPONENT;

const DEFAULT_PROPS: DividerProps = {
  location: 'middle',
};

export default function Divider(props: DividerProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  return (
    <div
      className={clsx([
        PREFIX,
        p.className,
        {
          'is-middle': p.location === 'middle',
          'is-left': p.location === 'left',
          'is-right': p.location === 'right',
        },
      ])}
    />
  );
}
