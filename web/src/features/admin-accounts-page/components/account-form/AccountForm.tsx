import { Input, Button, Select } from '@/components';
import { StylePrefix, PaymentProvider } from '@/types';
import clsx from 'clsx';
import React from 'react';
import { FormEvent, ReactElement, useState } from 'react';
import { PAYMENT_OPTIONS, getPaymentProviderFromString } from './utils';
import useEditAccountQueryParams from '../../useEditAccountQueryParams';
import {
  useGetAccountQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
} from '@/generated/graphql';
import { getAccountFromBasicAccountFragment } from '../../getAccountFromBasicAccountFragment';

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
  /** Handler for clearing the form and query params */
  handleClearForm: () => void;
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
            label="Balance"
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
              setPaymentProvider(newPaymentProvider);
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
  const { accountId, removeAccountId } = useEditAccountQueryParams();
  const [createAccount] = useCreateAccountMutation();
  const [updateAccount] = useUpdateAccountMutation();
  const { data, loading, error } = useGetAccountQuery({
    variables: { input: { id: accountId ?? '' } },
    skip: !accountId,
  });
  const account = data?.getAccountById
    ? getAccountFromBasicAccountFragment(data?.getAccountById)
    : undefined;
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [balance, setBalance] = useState(0);
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>();

  const initialFormValues = {
    name: account?.name ?? '',
    identifier: account?.identifier ?? '',
    balance: account?.balance ?? 0,
    paymentProvider: account?.paymentProvider,
  };

  const isDisabled = loading || !!error;
  const isSubmitDisabled = loading || !!error;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (accountId && (paymentProvider || initialFormValues.paymentProvider)) {
      await updateAccount({
        variables: {
          input: {
            id: accountId,
            name: name === '' ? initialFormValues.name : name,
            identifier:
              identifier === '' ? initialFormValues.identifier : identifier,
            balance: balance === 0 ? initialFormValues.balance : balance,
            // Type checking thinks type can be undefined,
            // but this is not the case since we check that either
            // the initial value or state value is defined above.
            // @typescript-eslint/ban-ts-comment
            // eslint-disable-next-line
            // @ts-ignore
            type: paymentProvider ?? initialFormValues.paymentProvider,
          },
        },
        refetchQueries: ['GetAllAccounts'],
      });
    } else if (paymentProvider) {
      await createAccount({
        variables: {
          input: {
            name,
            identifier,
            balance,
            type: paymentProvider,
          },
        },
        refetchQueries: ['GetAllAccounts'],
      });
    }
    handleClearForm();
  };

  const handleClearForm = () => {
    setName('');
    setIdentifier('');
    setBalance(0);
    setPaymentProvider(undefined);
    initialFormValues.name = '';
    initialFormValues.identifier = '';
    initialFormValues.balance = 0;
    initialFormValues.paymentProvider = undefined;
    removeAccountId();
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
      handleClearForm={handleClearForm}
    />
  );
}
