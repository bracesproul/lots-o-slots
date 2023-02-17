import { Button, Dialog, Select } from '@/components';
import React, { ReactElement, useState, FormEvent } from 'react';
import {
  PaymentProvider,
  useGetAllAccountsQuery,
  useSwitchDefaultAccountMutation,
} from '@/generated/graphql';
import { SelectOptionType } from '@/components/select/Select';
import {
  paymentProviderOptions,
  getPaymentProviderFromString,
  getStringFromPaymentProvider,
} from '@/utils';

export type ChangePaymentHandleDialogProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedAccount: string;
  setSelectedAccount: (selectedAccount: string) => void;
  options?: SelectOptionType[];
  setAccountType: (accountType: PaymentProvider | null) => void;
  accountType: PaymentProvider | null;
};

const PREFIX = 'change-handle-form';

function ChangePaymentHandleDialog(
  props: ChangePaymentHandleDialogProps
): ReactElement {
  const p = { ...props };

  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title="Set default account"
      buttonTitle="Close"
    >
      <form className={`${PREFIX}-dialog-form`} onSubmit={(e) => p.onSubmit(e)}>
        <label className={`${PREFIX}-form-label`}>
          Select account to make default
        </label>
        <Select
          placeholder={'Account type'}
          value={
            p.accountType
              ? getStringFromPaymentProvider(p.accountType)
              : undefined
          }
          onValueChange={(value: string) =>
            p.setAccountType(getPaymentProviderFromString(value))
          }
          open={true}
          options={paymentProviderOptions}
          label="select account"
        />
        {p.accountType && p.options && (
          <Select
            placeholder={'Please select an account'}
            value={p.selectedAccount}
            onValueChange={p.setSelectedAccount}
            open={true}
            options={p.options}
            label="select account"
          />
        )}
        <Button className={`${PREFIX}-form-submit`} type="submit">
          Submit
        </Button>
      </form>
    </Dialog>
  );
}

export default function ChangePaymentHandleDialogContainer(
  props: Pick<ChangePaymentHandleDialogProps, 'open' | 'setOpen'>
): ReactElement {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [accountType, setAccountType] = useState<PaymentProvider | null>(null);

  const { data } = useGetAllAccountsQuery();

  const accountsByType = data?.getAllAccounts
    .filter((account) => account.type === accountType)
    .map((account) => ({
      name:
        accountType === PaymentProvider.CASHAPP && account.cashtag
          ? account.cashtag
          : account.email,
      value: account.id,
    }));

  const [switchDefaultAccount] = useSwitchDefaultAccountMutation();

  return (
    <ChangePaymentHandleDialog
      {...props}
      options={accountsByType}
      selectedAccount={selectedAccount}
      setSelectedAccount={setSelectedAccount}
      onSubmit={(e) => {
        e.preventDefault();
        const accountToChange = data?.getAllAccounts.find(
          (account) => selectedAccount === account.id
        );
        if (!accountToChange) {
          throw new Error('No account found.');
        }
        switchDefaultAccount({
          variables: {
            input: {
              id: accountToChange.id,
              type: accountToChange.type,
            },
          },
        });
        props.setOpen(false);
      }}
      setAccountType={setAccountType}
      accountType={accountType}
    />
  );
}
