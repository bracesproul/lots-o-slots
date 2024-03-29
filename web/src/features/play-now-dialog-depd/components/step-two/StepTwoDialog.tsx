import { Input, Badge, Button, Dialog } from '@/components';
import { ReactElement, useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { DepositDialogProps } from '../../types';
import {
  findBadgeVariantFromPaymentType,
  findStringFromPaymentType,
} from '../../utils';
import { PaymentIdentifierInput } from '..';
import clsx from 'clsx';
import { PaymentProvider } from '@/generated/graphql';

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
      {!p.paymentHandle ? (
        <h1 className={'text-center text-white'}>
          An error occurred. Please try again later
        </h1>
      ) : (
        <form className={`${DEPOSIT_PREFIX}`} onSubmit={p.onSubmit}>
          {!isCountdownOver ? (
            <>
              <label className={`${DEPOSIT_PREFIX}-form-label`}>
                Deposit Amount - Minimum $20
              </label>
              <Input
                type="number"
                value={p.depositAmount.toString()}
                onChange={(e) => p.setDepositAmount(Number(e))}
                required
              />
              <label className={`${DEPOSIT_PREFIX}-form-label`}>
                Firekin Username
              </label>
              <Input value={p.username} onChange={p.setUsername} />
              {p.includePaymentIdentifier && (
                <PaymentIdentifierInput
                  className={'mt-[10px] flex flex-col'}
                  paymentProvider={p.paymentProvider}
                  paymentIdentifier={p.paymentIdentifier}
                  setPaymentIdentifier={p.setPaymentIdentifier}
                />
              )}
              {p.depositAmount >= 20 && p.paymentIdentifier ? (
                <>
                  <h1 className={`${DEPOSIT_PREFIX}-send-title`}>
                    Please send{' '}
                    <span className={`${DEPOSIT_PREFIX}-special-text`}>
                      ${p.depositAmount}
                    </span>{' '}
                    to the below address.
                  </h1>
                  <p
                    className={clsx(
                      `${`${DEPOSIT_PREFIX}-sub-text`}`,
                      'underline'
                    )}
                  >
                    This address is only good for 1 deposit.
                  </p>
                  <Badge
                    size="small"
                    className={`${DEPOSIT_PREFIX}-countdown-badge`}
                    variant={findBadgeVariantFromPaymentType(p.paymentProvider)}
                  >
                    <Countdown
                      className={'text-white '}
                      date={Date.now() + COUNTDOWN_TIMER}
                      onComplete={() => setIsCountdownOver(true)}
                    />
                  </Badge>

                  <div className={'flex flex-row m-auto gap-2'}>
                    <Badge
                      size="large"
                      variant={findBadgeVariantFromPaymentType(
                        p.paymentProvider
                      )}
                    >
                      {findStringFromPaymentType(p.paymentProvider)}
                    </Badge>
                    <Badge
                      size="large"
                      variant={findBadgeVariantFromPaymentType(
                        p.paymentProvider
                      )}
                    >
                      <>
                        {p.paymentProvider === PaymentProvider.CASHAPP && '$'}
                        {p.paymentHandle}
                      </>
                    </Badge>
                  </div>
                </>
              ) : (
                <></>
              )}
              <Button
                isDisabled={p.isConfirmPaidDisabled}
                className={`${DEPOSIT_PREFIX}-form-submit`}
                type="submit"
              >
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
        </form>
      )}
    </Dialog>
  );
}
