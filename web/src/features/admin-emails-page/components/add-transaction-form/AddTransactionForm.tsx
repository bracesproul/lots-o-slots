import { Input, Button, Select } from '@/components';
import { StylePrefix, PaymentProvider } from '@/types';
import clsx from 'clsx';
import React from 'react';
import { FormEvent, ReactElement, useState } from 'react';
import {
  PAYMENT_OPTIONS,
  getPaymentProviderFromString,
  getTransactionStatusFromString,
  getTransactionTypeFromString,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from './utils';
import {
  PaymentStatus,
  PaymentType,
  useCreateTransactionMutation,
} from '@/generated/graphql';

const PREFIX = StylePrefix.ADD_TRANSACTION_FORM;

type AddTransactionFormData = {
  /** The name of the user which made the payment */
  senderName: string;
  setSenderName: (name: string) => void;
  /** The accounts starting balance */
  amount: number;
  setAmount: (balance: number) => void;
  /** The payment type of the account */
  paymentProvider?: PaymentProvider;
  setPaymentProvider: (paymentProvider: PaymentProvider) => void;
  /** The status of the transaction */
  status?: PaymentStatus;
  setStatus: (status: PaymentStatus) => void;
  /** The type of transaction */
  type?: PaymentType;
  setType: (type: PaymentType) => void;
};

export type AddTransactionFormProps = {
  /** Optional className to override default styles. */
  className?: string;
  /** Form data */
  formData: AddTransactionFormData;
  /** Submit handler for updating/creating an account */
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  /** Whether or not the form fields are disabled */
  isDisabled: boolean;
  /** Whether or not the submit button should be disabled */
  isSubmitDisabled: boolean;
  /** Handler for clearing the form and query params */
  handleClearForm: () => void;
};

const DEFAULT_PROPS = {
  // add default props
};

function AddTransactionForm(props: AddTransactionFormProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const {
    senderName,
    setSenderName,
    amount,
    setAmount,
    paymentProvider,
    setPaymentProvider,
    status,
    setStatus,
    type,
    setType,
  } = p.formData;

  return (
    <div className={clsx(PREFIX, p.className)}>
      <form onSubmit={(e) => p.handleSubmit(e)}>
        <div className={`${PREFIX}-instructions`}>
          <h1 className={`${PREFIX}-heading`}>Add New Transaction</h1>
        </div>
        <div className={`${PREFIX}-fields`}>
          <Input
            type="text"
            value={senderName}
            onChange={setSenderName}
            label="Sender Name"
            isDisabled={p.isDisabled}
            className={`${PREFIX}-normal-input`}
            labelClassName={`${PREFIX}-input-label`}
            required
            autoComplete="off"
          />
          <Input
            type="number"
            value={amount}
            onChange={(value) => setAmount(Number(value))}
            label="Amount"
            isDisabled={p.isDisabled}
            className={`${PREFIX}-normal-input`}
            labelClassName={`${PREFIX}-input-label`}
            required
            autoComplete="off"
          />
          <Select
            placeholder="Please select one"
            options={PAYMENT_OPTIONS}
            required
            value={paymentProvider}
            onChange={(e) => {
              if (typeof e !== 'string') return;
              const newPaymentProvider = getPaymentProviderFromString(e);
              setPaymentProvider(newPaymentProvider);
            }}
            className={'bg-white text-black w-[350px]'}
          />
          <Select
            placeholder="Select a status"
            options={STATUS_OPTIONS}
            required
            value={status}
            onChange={(e) => {
              if (typeof e !== 'string') return;
              const newStatus = getTransactionStatusFromString(e);
              setStatus(newStatus);
            }}
            className={'bg-white text-black w-[350px]'}
          />
          <Select
            placeholder="Select a type"
            options={TYPE_OPTIONS}
            required
            value={type}
            onChange={(e) => {
              if (typeof e !== 'string') return;
              const newType = getTransactionTypeFromString(e);
              setType(newType);
            }}
            className={'bg-white text-black w-[350px]'}
          />
          <div className="flex flex-row gap-[8px]">
            <Button
              type="button"
              isDisabled={p.isSubmitDisabled}
              variant="secondary"
              className={`${PREFIX}-submit-button text-black`}
              onPress={p.handleClearForm}
            >
              Clear form
            </Button>
            <Button
              type="submit"
              isDisabled={p.isSubmitDisabled}
              variant="primary"
              className={`${PREFIX}-submit-button`}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

type AddTransactionFormContainerProps = {
  // Add props
};

export default function AddTransactionFormContainer(
  props: AddTransactionFormContainerProps
): ReactElement {
  const [senderName, setSenderName] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>();
  const [status, setStatus] = useState<PaymentStatus>();
  const [type, setType] = useState<PaymentType>();
  const [createTransaction, { loading, error }] =
    useCreateTransactionMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!paymentProvider || !status || !type) return;
    await createTransaction({
      variables: {
        input: {
          senderName,
          amount,
          provider: paymentProvider,
          status,
          paymentType: type,
        },
      },
    });
    handleClearForm();
  };

  const handleClearForm = () => {
    setSenderName('');
    setPaymentProvider(undefined);
    setAmount(0);
    setStatus(undefined);
    setType(undefined);
  };

  return (
    <AddTransactionForm
      formData={{
        senderName,
        setSenderName,
        amount,
        setAmount,
        paymentProvider,
        setPaymentProvider,
        status,
        setStatus,
        type,
        setType,
      }}
      handleSubmit={handleSubmit}
      isDisabled={loading || !!error}
      isSubmitDisabled={loading || !!error}
      handleClearForm={handleClearForm}
    />
  );
}
