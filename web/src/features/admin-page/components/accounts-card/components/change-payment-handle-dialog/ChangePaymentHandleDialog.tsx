import { Button, Dialog, Select } from '@/components';
import React, { ReactElement, useState } from 'react';

export type ChangePaymentHandleDialogProps = {
  onSubmit: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedAccount: string;
  setSelectedAccount: (selectedAccount: string) => void;
};

const PREFIX = 'change-handle-form';

const dummyAccountOptions = ['acc1', 'acc2', 'acc3', 'acc4'];

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
          options={dummyAccountOptions}
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

  React.useEffect(() => {
    console.log('selectedAccount', selectedAccount);
  }, [selectedAccount]);
  return (
    <ChangePaymentHandleDialog
      {...props}
      selectedAccount={selectedAccount}
      setSelectedAccount={setSelectedAccount}
      onSubmit={() => {
        // @TODO: Handle hookup
      }}
    />
  );
}
