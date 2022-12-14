import React, { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

type IconSize = 'small' | 'medium' | 'large' | 'xlarge' | 'custom';

export type IconProps = {
  className?: string;

  size?: IconSize;

  content: ReactNode | string;

  /**
   * The height of the icon. Only used when size is set to 'custom'
   * @default 20
   */
  height?: number;
  /**
   * The height of the icon. Only used when size is set to 'custom'
   * @default 20
   */
  width?: number;
};

const DEFAULT_PROPS = {
  size: 'medium',
  height: 20,
  width: 20,
};

function Icon(props: IconProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const { content, size, height, width, className } = p;
  return (
    <svg
      className={clsx([
        `icon-container`,
        {
          'is-small': size === 'small',
          'is-medium': size === 'medium',
          'is-large': size === 'large',
          'is-xlarge': size === 'xlarge',
        },
        className,
      ])}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {typeof content === 'string' ? (
        <path d={content} fillRule="evenodd" clipRule="evenodd" />
      ) : (
        content
      )}
    </svg>
  );
}

export default Icon;
