import { ReactElement } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types/style-prefix';

export type AppStoreButtonsDialogProps = {
  className?: string;
};

const PREFIX = StylePrefix.APP_STORE_BUTTONS_DIALOG;

export default function AppStoreButtonsDialog(
  props: AppStoreButtonsDialogProps
): ReactElement {
  const p = props;
  return <div className={clsx(PREFIX, p.className)}></div>;
}
