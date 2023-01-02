import { Input, Badge, Button, Dialog } from '@/components';
import { ReactElement, useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { DepositDialogProps } from '../../types';
import {
  findBadgeVariantFromPaymentType,
  findStringFromPaymentType,
} from '../../utils';

const DEPOSIT_PREFIX = 'deposit-dialog';

const COUNTDOWN_TIMER = 900000;

export default function StepTwoDialog(props: DepositDialogProps): ReactElement {
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
      <div className={`${DEPOSIT_PREFIX}`}>
        {!isCountdownOver ? (
          <>
            <label className={`${DEPOSIT_PREFIX}-form-label`}>
              Deposit Amount
            </label>
            <Input
              type="number"
              value={p.depositAmount.toString()}
              onChange={(e) => p.setDepositAmount(Number(e))}
            />
            {p.depositAmount > 0 ? (
              <>
                <h1 className={`${DEPOSIT_PREFIX}-send-title`}>
                  Please send{' '}
                  <span className={`${DEPOSIT_PREFIX}-special-text`}>
                    ${p.depositAmount}
                  </span>{' '}
                  to the below address.
                </h1>
                <Countdown
                  className={'text-white mt-[5px]'}
                  date={Date.now() + COUNTDOWN_TIMER}
                  onComplete={() => setIsCountdownOver(true)}
                />
                <p className={`${DEPOSIT_PREFIX}-sub-text`}>
                  You have 15 minutes to pay. Please click confirm paid once
                  finished. Thank you!
                </p>
                <div className={'flex flex-row m-auto gap-2'}>
                  <Badge
                    variant={findBadgeVariantFromPaymentType(p.paymentProvider)}
                  >
                    {findStringFromPaymentType(p.paymentProvider)}
                  </Badge>
                  <Badge
                    variant={findBadgeVariantFromPaymentType(p.paymentProvider)}
                  >
                    {p.paymentHandle}
                  </Badge>
                </div>
              </>
            ) : (
              <></>
            )}
            <Button className={`${DEPOSIT_PREFIX}-form-submit`} type="button">
              Confirm Paid
            </Button>
          </>
        ) : (
          <>
            <h1 className={`${DEPOSIT_PREFIX}-expired`}>Time Expired</h1>
            <p className={`${DEPOSIT_PREFIX}-expired-body`}>
              Your payment window has expired. Please try again.
            </p>
          </>
        )}
      </div>
    </Dialog>
  );
}
