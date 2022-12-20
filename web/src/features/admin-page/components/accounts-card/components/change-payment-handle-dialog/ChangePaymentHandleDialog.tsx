import { Button, Dialog, Select } from '@/components';
import React, { ReactElement, useState } from 'react';
import { useGetAllAccountsQuery } from '@/generated/graphql';
import { SelectOptionType } from '@/components/select/Select';

export type ChangePaymentHandleDialogProps = {
  onSubmit: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedAccount: string;
  setSelectedAccount: (selectedAccount: string) => void;
  options: SelectOptionType[];
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
      title="Add New CashApp Account"
      buttonTitle="Close"
    >
      <form className={`${PREFIX}-dialog-form`} onSubmit={p.onSubmit}>
        <label className={`${PREFIX}-form-label`}>
          Select account to make default
        </label>
        <Select
          value={p.selectedAccount}
          onValueChange={p.setSelectedAccount}
          open={true}
          options={p.options}
          label="select account"
        />
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

  const { data } = useGetAllAccountsQuery();

  return (
    <ChangePaymentHandleDialog
      {...props}
      options={
        data?.getAllAccounts.map((account) => {
          return {
            name: account.email,
            value: account.id,
          };
        }) ?? []
      }
      selectedAccount={selectedAccount}
      setSelectedAccount={setSelectedAccount}
      onSubmit={() => {
        // @TODO: Handle hookup
      }}
    />
  );
}
