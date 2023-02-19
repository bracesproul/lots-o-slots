import { ReactElement } from 'react';
import clsx from 'clsx';
import { StylePrefix } from '@/types/style-prefix';
import { Dialog } from '@/components';
import MobileStoreButton from 'react-mobile-store-button';

export type AppStoreButtonsDialogProps = {
  className?: string;
  /** Whether or not the dialog is open */
  open: boolean;
  /** Event handler for opening/closing dialog state */
  setOpen: (open: boolean) => void;
};

const PREFIX = StylePrefix.APP_STORE_BUTTONS_DIALOG;

const POKERBROS_APP_STORE_URL =
  'https://apps.apple.com/us/app/pokerbros/id1463376042';
const POKERBROS_GOOGLE_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.kpgame.PokerBros';

export default function AppStoreButtonsDialog(
  props: AppStoreButtonsDialogProps
): ReactElement {
  const p = { ...props };
  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title={'Download Pokerbros on your mobile device'}
      buttonTitle="Close"
    >
      <div className={clsx(PREFIX, p.className)}>
        <MobileStoreButton
          store="ios"
          url={POKERBROS_APP_STORE_URL}
          linkProps={{ title: 'iOS Store Button' }}
          height={50}
        />
        <MobileStoreButton
          store="android"
          url={POKERBROS_GOOGLE_PLAY_STORE_URL}
          linkProps={{ title: 'Google Play Store Button' }}
        />
      </div>
    </Dialog>
  );
}
