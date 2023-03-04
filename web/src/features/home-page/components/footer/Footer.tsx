import { ReactElement } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types/style-prefix';

export type FooterProps = {
  /** Optional prop for overriding styles */
  className?: string;
};

const PREFIX = StylePrefix.FOOTER;

const DEFAULT_PROPS: FooterProps = {};

export default function Footer(props: FooterProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };

  return (
    <footer className={clsx([PREFIX, p.className])}>
      <p>© 2022 Lots O’ Slots, LLC. All rights reserved.</p>
    </footer>
  );
}
