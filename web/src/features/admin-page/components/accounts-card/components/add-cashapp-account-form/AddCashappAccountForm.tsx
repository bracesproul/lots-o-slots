import { Button, Dialog, Select } from '@/components';
import { FormEvent, ReactElement, useState } from 'react';
import {
  PaymentProvider,
  useAddCashappAccountMutation,
} from '@/generated/graphql';
import {
  RefetchAccountInputType,
  RefetchAccountReturnType,
} from '../../AccountsCard';
import {
  CashAppForm,
  ZelleForm,
  PayPalForm,
  EthereumForm,
  BitcoinForm,
} from './components';
import { StylePrefix } from '@/types/style-prefix';

export type CashAppFormProps = {
  balance: number;
  setBalance: (balance: number) => void;

  sent: number;
  setSent: (sent: number) => void;

  cashtag: string;
  setCashtag: (cashtag: string) => void;

  email: string;
  setEmail: (email: string) => void;
};

export type ZelleFormProps = {
  email: string;
  setEmail: (email: string) => void;
};

export type PayPalFormProps = {
  email: string;
  setEmail: (email: string) => void;
};

export type CryptoFromProps = {
  address: string;
  setAddress: (address: string) => void;
};

export type AddCashappAccountFormProps = CashAppFormProps &
  CryptoFromProps & {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    refetch: (variables: RefetchAccountInputType) => RefetchAccountReturnType;

    resetForm: () => void;

    open: boolean;
    setOpen: (open: boolean) => void;

    accountType?: PaymentProvider;
    setAccountType: (accountType: PaymentProvider) => void;
  };

const PREFIX = StylePrefix.CASHAPP_FORM;

const PAYMENT_PROVIDER_OPTIONS = [
  {
    value: PaymentProvider.CASHAPP,
    name: 'Cashapp',
  },
  {
    value: PaymentProvider.PAYPAL,
    name: 'PayPal',
  },
  {
    value: PaymentProvider.ZELLE,
    name: 'Zelle',
  },
  {
    value: PaymentProvider.BITCOIN,
    name: 'Bitcoin',
  },
  {
    value: PaymentProvider.ETHEREUM,
    name: 'Ethereum',
  },
];

const getPaymentProviderFromString = (
  paymentProvider: string
): PaymentProvider => {
  switch (paymentProvider.toUpperCase()) {
    case 'CASHAPP':
      return PaymentProvider.CASHAPP;
    case 'PAYPAL':
      return PaymentProvider.PAYPAL;
    case 'ZELLE':
      return PaymentProvider.ZELLE;
    case 'BITCOIN':
      return PaymentProvider.BITCOIN;
    case 'ETHEREUM':
      return PaymentProvider.ETHEREUM;
    default:
      return PaymentProvider.CASHAPP;
  }
};

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
        <Select
          value={p.accountType}
          onValueChange={(e) => {
            p.resetForm();
            p.setAccountType(getPaymentProviderFromString(e));
          }}
          label="Payment Provider"
          options={PAYMENT_PROVIDER_OPTIONS}
          placeholder="Select an Account Type"
        />
        {p.accountType === PaymentProvider.CASHAPP && (
          <CashAppForm
            balance={p.balance}
            setBalance={p.setBalance}
            sent={p.sent}
            setSent={p.setSent}
            cashtag={p.cashtag}
            setCashtag={p.setCashtag}
            email={p.email}
            setEmail={p.setEmail}
          />
        )}
        {p.accountType === PaymentProvider.ZELLE && (
          <ZelleForm email={p.email} setEmail={p.setEmail} />
        )}
        {p.accountType === PaymentProvider.PAYPAL && (
          <PayPalForm email={p.email} setEmail={p.setEmail} />
        )}
        {p.accountType === PaymentProvider.BITCOIN && (
          <BitcoinForm address={p.address} setAddress={p.setAddress} />
        )}
        {p.accountType === PaymentProvider.ETHEREUM && (
          <EthereumForm address={p.address} setAddress={p.setAddress} />
        )}
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
  const [address, setAddress] = useState('');
  const [accountType, setAccountType] = useState<PaymentProvider | undefined>(
    undefined
  );

  return (
    <AddCashappAccountForm
      {...props}
      accountType={accountType}
      setAccountType={setAccountType}
      balance={balance}
      setBalance={setBalance}
      sent={sent}
      setSent={setSent}
      cashtag={newCashtag}
      setCashtag={setNewCashtag}
      email={newCashappEmail}
      setEmail={setNewCashappEmail}
      address={address}
      setAddress={setAddress}
      onSubmit={async (e) => {
        e.preventDefault();
        await addCashappAccount({
          variables: {
            input: {
              email: newCashappEmail,
              cashtag: newCashtag,
              balance: balance,
              weeklyWithdrawals: sent,
              paymentProvider: accountType ?? PaymentProvider.CASHAPP,
              bitcoinAddress:
                accountType === PaymentProvider.BITCOIN ? address : undefined,
              ethereumAddress:
                accountType === PaymentProvider.ETHEREUM ? address : undefined,
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
      resetForm={() => {
        setNewCashtag('');
        setNewCashappEmail('');
        setBalance(0);
        setSent(0);
        setAddress('');
      }}
    />
  );
}
