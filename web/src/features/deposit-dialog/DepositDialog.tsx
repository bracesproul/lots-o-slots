import { Button, Dialog, Input } from '@/components';
import { ReactElement, useState, useEffect } from 'react';
import { PaymentProvider } from '@/generated/graphql';
import Countdown from 'react-countdown';

type DialogStage = 'PlayNow' | 'Deposit' | 'Withdraw';

export type DepositDialogProps = {
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: () => void;
  depositAmount: number;
  setDepositAmount: (depositAmount: number) => void;
  paymentType: PaymentProvider | null;
  paymentHandle: string;
  stage: DialogStage;
};

const PREFIX = 'deposit-dialog';

const COUNTDOWN_TIMER = 900000;

function DepositDialog(props: DepositDialogProps): ReactElement {
  const p = { ...props };
  const [isCountdownOver, setIsCountdownOver] = useState(false);

  useEffect(() => {
    if (isCountdownOver && !p.open) {
      setIsCountdownOver(false);
    }
  }, [isCountdownOver, p.open]);

  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title={!isCountdownOver ? 'Complete Payment' : 'Expired'}
      description={
        !isCountdownOver
          ? 'Please follow the instructions below on how to pay.'
          : undefined
      }
      buttonTitle="Close"
    >
      <div className={`${PREFIX}`}>
        {!isCountdownOver ? (
          <>
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
                  </span>{' '}
                  to the below address.
                </h1>
                <Countdown
                  className={'text-white mt-[5px]'}
                  date={Date.now() + COUNTDOWN_TIMER}
                  onComplete={() => setIsCountdownOver(true)}
                />
                <p className={`${PREFIX}-sub-text`}>
                  You have 15 minutes to pay. Please click confirm paid once
                  finished. Thank you!
                </p>
                <h2 className={`${PREFIX}-payment-type`}>{p.paymentType}</h2>
                <h3 className={`${PREFIX}-payment-handle`}>
                  {p.paymentHandle}
                </h3>
              </>
            ) : (
              <></>
            )}
            <Button className={`${PREFIX}-form-submit`} type="button">
              Confirm Paid
            </Button>
          </>
        ) : (
          <>
            <h1 className={`${PREFIX}-expired`}>Time Expired</h1>
            <p className={`${PREFIX}-expired-body`}>
              Your payment window has expired. Please try again.
            </p>
          </>
        )}
      </div>
    </Dialog>
  );
}
/**
 * @deprecated Use *<PlayNowDialogContainer \/\>* instead
 */
export default function DepositDialogContainer(
  props: Pick<DepositDialogProps, 'open' | 'setOpen' | 'paymentType' | 'stage'>
): ReactElement {
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const TEMP_PAYMENT_HANDLE = 'zelle@example.com';

  return (
    <DepositDialog
      {...props}
      depositAmount={depositAmount}
      setDepositAmount={setDepositAmount}
      paymentType={props.paymentType}
      paymentHandle={TEMP_PAYMENT_HANDLE}
      onSubmit={() => {
        // TODO: hookup
      }}
    />
  );
}
