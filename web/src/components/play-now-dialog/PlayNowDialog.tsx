import { Button, Dialog, Select } from '@/components';
import { FormEvent, ReactElement, useState } from 'react';
import { PaymentProvider } from '@/generated/graphql';

export type PlayNowDialogProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedGame: string;
  setSelectedGame: (selectedGame: string) => void;
  paymentProvider: PaymentProvider | null;
  setPaymentProvider: (paymentProvider: PaymentProvider) => void;
  setDepositDialogOpen: (open: boolean) => void;
};

const PREFIX = 'play-now-dialog';

const GAME_OPTIONS = [
  { name: 'Slots', value: 'slots' },
  { name: 'Poker', value: 'poker' },
];

const PAYMENT_OPTIONS = [
  { name: 'PayPal', value: PaymentProvider.PAYPAL },
  { name: 'CashApp', value: PaymentProvider.CASHAPP },
  { name: 'Zelle', value: PaymentProvider.ZELLE },
];

function PlayNowDialog(props: PlayNowDialogProps): ReactElement {
  const p = { ...props };
  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title="Add New CashApp Account"
      buttonTitle="Close"
    >
      <form className={`${PREFIX}-dialog-form`} onSubmit={(e) => p.onSubmit(e)}>
        <label className={`${PREFIX}-form-label`}>Please Select a Game</label>
        <Select
          placeholder="Please select one"
          options={GAME_OPTIONS}
          required
          value={p.selectedGame}
          onValueChange={(e) => p.setSelectedGame(e)}
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
        <Button className={`${PREFIX}-form-submit`} type="submit">
          Next
        </Button>
      </form>
    </Dialog>
  );
}

export default function PlayNowDialogContainer(
  props: Pick<
    PlayNowDialogProps,
    | 'open'
    | 'setOpen'
    | 'paymentProvider'
    | 'setPaymentProvider'
    | 'setDepositDialogOpen'
  >
): ReactElement {
  const [selectedGame, setSelectedGame] = useState('');
  return (
    <PlayNowDialog
      {...props}
      selectedGame={selectedGame}
      setSelectedGame={setSelectedGame}
      onSubmit={(e) => {
        e.preventDefault();
        props.setOpen(false);
        props.setDepositDialogOpen(true);
      }}
    />
  );
}
