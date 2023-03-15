import { StylePrefix } from '@/types';
import clsx from 'clsx';
import React, { ReactElement } from 'react';

type TextType =
  | 'body-xs'
  | 'body-sm'
  | 'body-md'
  | 'body-lg'
  | 'body-xl'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'custom';

export type TextProps = {
  className?: string;

  /**
   * The sizing type of the text.
   * @default 'body-md'
   */
  type?: TextType;

  /**
   * Whether or not the text is bold.
   * @default false
   */
  isHeavy?: boolean;

  /** The text to display. */
  children:
    | string
    | number
    | ReactElement
    | string[]
    | ReactElement[]
    | [string, ReactElement];

  /** Custom text size */
  customSize?: string;
};

const PREFIX = StylePrefix.TEXT_BASE;

const DEFAULT_PROPS = {
  type: 'body-md' as TextType,
  isHeavy: false,
};

export default function HomePage(props: TextProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  return (
    <p
      className={clsx([
        `${PREFIX}`,
        p.className,
        p.type === 'custom' && `text-[${p.customSize}px]`,
        {
          'is-heavy': p.isHeavy,
          [p.type]: true,
        },
      ])}
    >
      {p.children}
    </p>
  );
}
