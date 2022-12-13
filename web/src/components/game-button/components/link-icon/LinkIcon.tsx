import clsx from 'clsx';
import { ReactElement } from 'react';
import { AiOutlineLink } from 'react-icons/ai';

export default function LinkIcon(): ReactElement {
  return (
    <span className={clsx('link-icon')}>
      <AiOutlineLink color="white" size="25" />
    </span>
  );
}
