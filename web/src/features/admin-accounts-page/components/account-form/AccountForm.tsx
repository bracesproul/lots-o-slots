import { Input, Button, Select } from '@/components';
import { StylePrefix, PaymentProvider } from '@/types';
import clsx from 'clsx';
import React from 'react';
import { FormEvent, ReactElement, useState } from 'react';
import { PAYMENT_OPTIONS, getPaymentProviderFromString } from './utils';

const PREFIX = StylePrefix.ACCOUNT_FORM;

type AccountFormData = {
  /** The accounts name */
  name: string;
  setName: (name: string) => void;
  /** The identifier for the account */
  identifier: string;
  setIdentifier: (identifier: string) => void;
  /** The accounts starting balance */
  balance: number;
  setBalance: (balance: number) => void;
  /** The payment type of the account */
  paymentProvider?: PaymentProvider;
  setPaymentProvider: (paymentProvider: PaymentProvider) => void;
};

export type AccountFormProps = {
  /** Optional className to override default styles. */
  className?: string;
  /** Form data */
  formData: AccountFormData;
  /** Initial values to populate the form with, will be undefined if it's a new account */
  initialFormValues: Pick<
    AccountFormData,
    'name' | 'identifier' | 'balance' | 'paymentProvider'
  >;
  /** Submit handler for updating/creating an account */
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  /** Whether or not the form fields are disabled */
  isDisabled: boolean;
  /** Whether or not the submit button should be disabled */
  isSubmitDisabled: boolean;
};

const DEFAULT_PROPS = {
  // add default props
};

function AccountForm(props: AccountFormProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const {
    name,
    setName,
    identifier,
    setIdentifier,
    balance,
    setBalance,
    paymentProvider,
    setPaymentProvider,
  } = p.formData;

  return (
    <div className={clsx(PREFIX, p.className)}>
      <form onSubmit={(e) => p.handleSubmit(e)}>
        <div className={`${PREFIX}-instructions`}>
          <h1 className={`${PREFIX}-heading`}>Add/Edit Account</h1>
        </div>
        <div className={`${PREFIX}-fields`}>
          <Input
            type="text"
            value={name === '' ? p.initialFormValues.name : name}
            onChange={setName}
            label="Account Name"
            isDisabled={p.isDisabled}
            className={`${PREFIX}-normal-input`}
            labelClassName={`${PREFIX}-input-label`}
            required
            autoComplete="off"
          />
          <Input
            type="text"
            value={
              identifier === '' ? p.initialFormValues.identifier : identifier
            }
            onChange={setIdentifier}
            label="Identifier, e.g. cashtag or email"
            isDisabled={p.isDisabled}
            className={`${PREFIX}-normal-input`}
            labelClassName={`${PREFIX}-input-label`}
            required
            autoComplete="off"
          />
          <Input
            type="number"
            value={balance === 0 ? p.initialFormValues.balance : balance}
            onChange={(value) => setBalance(Number(value))}
            label="Email"
            className={`${PREFIX}-normal-input`}
            labelClassName={`${PREFIX}-input-label`}
            isDisabled={p.isDisabled}
            required
            autoComplete="off"
          />
          <Select
            placeholder="Please select one"
            options={PAYMENT_OPTIONS}
            required
            value={paymentProvider ?? p.initialFormValues.paymentProvider}
            onChange={(e) => {
              if (typeof e !== 'string') return;

              const newPaymentProvider = getPaymentProviderFromString(e);
              console.log('new payment provider', newPaymentProvider);
              setPaymentProvider(newPaymentProvider);
            }}
            className={'bg-white text-black w-[350px]'}
          />
          <div>
            <Button
              type="submit"
              isDisabled={p.isSubmitDisabled}
              variant="primary"
              className={`${PREFIX}-submit-button`}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

type AccountFormContainerProps = {
  /** Whether or not the form is in edit mode */
  isEditMode: boolean;
};

export default function AccountFormContainer(
  props: AccountFormContainerProps
): ReactElement {
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [balance, setBalance] = useState(0);
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>();

  const initialFormValues = {
    name: '',
    identifier: '',
    balance: 0,
    paymentProvider: PaymentProvider.PAYPAL,
  };

  const isDisabled = false;
  const isSubmitDisabled = false;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // todo: hookup to api
  };

  return (
    <AccountForm
      formData={{
        name,
        setName,
        identifier,
        setIdentifier,
        balance,
        setBalance,
        paymentProvider,
        setPaymentProvider,
      }}
      initialFormValues={initialFormValues}
      handleSubmit={handleSubmit}
      isDisabled={isDisabled}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
}
