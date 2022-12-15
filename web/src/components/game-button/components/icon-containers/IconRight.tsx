import { BlackPokerChip, RedPokerChip } from '@/assets';
import clsx from 'clsx';
import { ReactElement } from 'react';
import { LinkIcon } from '../link-icon';
import { GetIconProps } from './types';

export default function IconRight(props: GetIconProps): ReactElement {
  const { icon, customIcon, usingBackground, none } = props;
  if (none) {
    return <></>;
  }
  let iconToUse = <></>;
  switch (icon) {
    case 'blackChip':
      iconToUse = <BlackPokerChip />;
      break;
    case 'redChip':
      iconToUse = <RedPokerChip />;
      break;
    case 'link':
      iconToUse = <LinkIcon />;
      break;
    case 'custom':
      iconToUse = <>{customIcon}</>;
      break;
    default:
      iconToUse = <></>;
      break;
  }
  return (
    <div
      className={clsx([
        `icon-right`,
        {
          'no-border': usingBackground,
          'has-border': !usingBackground,
        },
      ])}
    >
      <div
        className={clsx([`icon-wrapper`, { 'is-not-link': icon !== 'link' }])}
      >
        {iconToUse}
      </div>
    </div>
  );
}
