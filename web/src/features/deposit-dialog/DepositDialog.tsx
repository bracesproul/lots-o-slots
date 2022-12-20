import { Button, Dialog, Input } from '@/components';
import { ReactElement, useState } from 'react';
import { PaymentProvider } from '@/generated/graphql';

export type DepositDialogProps = {
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: () => void;
  depositAmount: number;
  setDepositAmount: (depositAmount: number) => void;
  paymentType: PaymentProvider | null;
  paymentHandle: string;
};

const PREFIX = 'deposit-dialog';

function DepositDialog(props: DepositDialogProps): ReactElement {
  const p = { ...props };
  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title="Complete Payment"
      description="Please follow the instructions below on how to pay."
      buttonTitle="Close"
    >
      <div className={`${PREFIX}`}>
        <label className={`${PREFIX}-form-label`}>Deposit Amount</label>
        <Input
          type="number"
          value={p.depositAmount.toString()}
          onChange={(e) => p.setDepositAmount(Number(e))}
        />
        {p.depositAmount > 0 ? (
          <>
            <h1 className={`${PREFIX}-send-title`}>
              Please send{' '}
              <span className={`${PREFIX}-special-text`}>
                ${p.depositAmount}
              </span>
              to the below address.
            </h1>
            <p className={`${PREFIX}-sub-text`}>
              You have 15 minuets to pay. Please click confirm paid once
              finished. Thank you!
            </p>
            <h2 className={`${PREFIX}-payment-type`}>{p.paymentType}</h2>
            <h3 className={`${PREFIX}-payment-handle`}>{p.paymentHandle}</h3>
          </>
        ) : (
          <></>
        )}
        <Button className={`${PREFIX}-form-submit`} type="button">
          Confirm Paid
        </Button>
      </div>
    </Dialog>
  );
}

export default function DepositDialogContainer(
  props: Pick<DepositDialogProps, 'open' | 'setOpen' | 'paymentType'>
): ReactElement {
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const TEMP_PAYMENT_TYPE = PaymentProvider.ZELLE;
  const TEMP_PAYMENT_HANDLE = 'zelle@example.com';

  return (
    <DepositDialog
      {...props}
      depositAmount={depositAmount}
      setDepositAmount={setDepositAmount}
      paymentType={TEMP_PAYMENT_TYPE}
      paymentHandle={TEMP_PAYMENT_HANDLE}
      onSubmit={() => {
        // TODO: hookup
      }}
    />
  );
}
