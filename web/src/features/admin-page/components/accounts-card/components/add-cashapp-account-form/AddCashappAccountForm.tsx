import { Button, Dialog } from '@/components';
import { FormEvent, ReactElement, useState } from 'react';
import {
  PaymentProvider,
  useAddCashappAccountMutation,
} from '@/generated/graphql';
import {
  RefetchAccountInputType,
  RefetchAccountReturnType,
} from '../../AccountsCard';

export type AddCashappAccountFormProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  refetch: (variables: RefetchAccountInputType) => RefetchAccountReturnType;
  cashtag: string;
  setCashtag: (cashtag: string) => void;

  email: string;
  setEmail: (email: string) => void;

  open: boolean;
  setOpen: (open: boolean) => void;

  balance: number;
  setBalance: (balance: number) => void;

  sent: number;
  setSent: (sent: number) => void;
};

const PREFIX = 'cashapp-form';

function AddCashappAccountForm(
  props: AddCashappAccountFormProps
): ReactElement {
  const p = { ...props };
  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title="Add New CashApp Account"
      buttonTitle="Close"
    >
      <form className={`${PREFIX}-dialog-form`} onSubmit={p.onSubmit}>
        <label className={`${PREFIX}-form-label`}>
          Cashtag{' '}
          <span className={`${PREFIX}-subtext-label`}>
            * Do not include {`'$'`} *
          </span>
        </label>
        <input
          value={p.cashtag}
          onChange={(e) => p.setCashtag(e.target.value)}
          required
          name="cashtag"
          placeholder="Cashtag"
          id="cashtag"
          type="text"
          className={`${PREFIX}-form-input`}
        />
        <label className={`${PREFIX}-form-label`}>Email</label>
        <input
          value={p.email}
          onChange={(e) => p.setEmail(e.target.value)}
          required
          name="email"
          placeholder="email@catchall.com"
          id="email"
          type="email"
          className={`${PREFIX}-form-input`}
        />
        <label className={`${PREFIX}-form-label`}>Starting Balance</label>
        <input
          className={`${PREFIX}-form-input`}
          type="number"
          placeholder="Starting balance"
          id="balance"
          value={p.balance.toString()}
          onChange={(e) => p.setBalance(Number(e))}
        />
        <label className={`${PREFIX}-form-label`}>Amount Sent</label>
        <input
          className={`${PREFIX}-form-input`}
          type="number"
          placeholder="Amount Sent"
          id="amount-sent"
          value={p.sent.toString()}
          onChange={(e) => p.setSent(Number(e))}
        />
        <Button className={`${PREFIX}-form-submit`} type="submit">
          Submit
        </Button>
      </form>
    </Dialog>
  );
}

export default function AddCashappAccountFormContainer(
  props: Pick<AddCashappAccountFormProps, 'open' | 'setOpen' | 'refetch'>
): ReactElement {
  const [addCashappAccount] = useAddCashappAccountMutation();
  const [newCashtag, setNewCashtag] = useState('');
  const [newCashappEmail, setNewCashappEmail] = useState('');
  const [balance, setBalance] = useState(0);
  const [sent, setSent] = useState(0);

  return (
    <AddCashappAccountForm
      {...props}
      balance={balance}
      setBalance={setBalance}
      sent={sent}
      setSent={setSent}
      cashtag={newCashtag}
      setCashtag={setNewCashtag}
      email={newCashappEmail}
      setEmail={setNewCashappEmail}
      onSubmit={async (e) => {
        e.preventDefault();
        await addCashappAccount({
          variables: {
            input: {
              email: newCashappEmail,
              cashtag: newCashtag,
              balance: balance,
              weeklyWithdrawals: sent,
            },
          },
        });
        props.refetch({
          input: {
            provider: PaymentProvider.CASHAPP,
          },
        });
        props.setOpen(false);
        setNewCashtag('');
        setNewCashappEmail('');
      }}
    />
  );
}
