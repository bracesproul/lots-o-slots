import { Button, Dialog, Select } from '@/components';
import { PaymentProvider } from '@/generated/graphql';
import { ReactElement } from 'react';
import { PlayDialogProps } from '../../types';
import { findStringFromGameType, findGameTypeFromString } from '../../utils';

const PREFIX = 'play-now-dialog';

const GAME_OPTIONS = [
  { name: 'Slots', value: 'slots' },
  { name: 'Poker', value: 'poker' },
];

const PAYMENT_OPTIONS = [
  { name: 'PayPal', value: PaymentProvider.PAYPAL },
  { name: 'CashApp', value: PaymentProvider.CASHAPP },
  { name: 'Zelle', value: PaymentProvider.ZELLE },
  { name: 'Bitcoin', value: PaymentProvider.BITCOIN },
  { name: 'Ethereum', value: PaymentProvider.ETHEREUM },
];

export default function StepOneDialog(props: PlayDialogProps): ReactElement {
  const p = { ...props };
  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title="Play Now"
      buttonTitle="Close"
    >
      <form className={`${PREFIX}-dialog-form`} onSubmit={(e) => p.onSubmit(e)}>
        <label className={`${PREFIX}-form-label`}>Please Select a Game</label>
        <Select
          placeholder="Please select one"
          options={GAME_OPTIONS}
          required
          value={findStringFromGameType(p.gameType)}
          onValueChange={(e) => p.setGameType(findGameTypeFromString(e))}
        />
        <label className={`${PREFIX}-form-label`}>
          Please Select a Payment Type
        </label>
        <Select
          placeholder="Please select one"
          options={PAYMENT_OPTIONS}
          required
          value={p.paymentProvider ?? undefined}
          onValueChange={(e) => {
            switch (e) {
              case 'ZELLE':
                p.setPaymentProvider(PaymentProvider.ZELLE);
                break;
              case 'PAYPAL':
                p.setPaymentProvider(PaymentProvider.PAYPAL);
                break;
              case 'CASHAPP':
                p.setPaymentProvider(PaymentProvider.CASHAPP);
                break;
            }
          }}
        />
        <Button
          className={`${PREFIX}-form-submit`}
          type="submit"
          isDisabled={p.isNextDisabled}
        >
          Next
        </Button>
      </form>
    </Dialog>
  );
}
