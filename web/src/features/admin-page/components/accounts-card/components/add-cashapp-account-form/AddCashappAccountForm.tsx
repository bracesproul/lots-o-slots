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

  return (
    <AddCashappAccountForm
      {...props}
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
