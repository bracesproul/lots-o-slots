import { FormEvent, ReactElement, useEffect, useState } from 'react';
import { PaymentProvider } from '@/generated/graphql';
import { PlayGameDialogProps, DialogStage } from './types';
import { StepOneDialog, StepTwoDialog } from './components';
import { useCreateUserPaymentMutation } from '@/generated/graphql';
import { findUserId } from '@/utils';

export type PlayNowDialogProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedGame: string;
  setSelectedGame: (selectedGame: string) => void;
  paymentProvider: PaymentProvider | null;
  setPaymentProvider: (paymentProvider: PaymentProvider) => void;
  setDepositDialogOpen: (open: boolean) => void;
};

export default function PlayNowDialogContainer(
  props: PlayGameDialogProps
): ReactElement {
  const p = { ...props };

  const [depositAmount, setDepositAmount] = useState(0);
  const TEMP_PAYMENT_HANDLE = 'zelle@example.com';
  const [paymentIdentifier, setPaymentIdentifier] = useState('');
  const [createUserPayment] = useCreateUserPaymentMutation();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!p.open) {
      p.setGameType(null);
      p.setPaymentProvider(null);
      setDepositAmount(0);
    }
    console.log('open change');
  }, [p.open]);

  return (
    <>
      {p.stage === DialogStage.STAGE_ONE ? (
        <StepOneDialog
          open={p.open}
          setOpen={p.setOpen}
          paymentIdentifier={paymentIdentifier}
          setPaymentIdentifier={setPaymentIdentifier}
          isNextDisabled={
            p.gameType && paymentIdentifier && p.paymentProvider ? false : true
          }
          gameType={p.gameType}
          setGameType={p.setGameType}
          paymentProvider={p.paymentProvider}
          setPaymentProvider={p.setPaymentProvider}
          onSubmit={(e) => {
            e.preventDefault();
            p.setStage(DialogStage.STAGE_TWO);
          }}
        />
      ) : (
        <>
          {p.paymentProvider && (
            <StepTwoDialog
              isConfirmPaidDisabled={
                p.paymentProvider && depositAmount > 0 ? false : true
              }
              open={p.open}
              setOpen={p.setOpen}
              depositAmount={depositAmount}
              setDepositAmount={setDepositAmount}
              paymentProvider={p.paymentProvider}
              paymentHandle={TEMP_PAYMENT_HANDLE}
              paymentIdentifier={paymentIdentifier}
              setPaymentIdentifier={setPaymentIdentifier}
              includePaymentIdentifier={p.includePaymentIdentifier ?? false}
              error={error}
              onSubmit={async (e) => {
                e.preventDefault();
                if (!p.paymentProvider || !p.gameType) {
                  console.log(
                    'no payment provider or game type',
                    p.paymentProvider,
                    p.gameType
                  );
                  return;
                }
                const { errors } = await createUserPayment({
                  variables: {
                    input: {
                      paymentProvider: p.paymentProvider,
                      paymentIdentifier: paymentIdentifier,
                      amount: depositAmount,
                      userId: findUserId(),
                      gameType: p.gameType,
                    },
                  },
                });
                if (errors?.length) {
                  console.log(errors);
                  setError(true);
                } else {
                  console.log('no errors');
                  p.setOpen(false);
                }
              }}
            />
          )}
        </>
      )}
    </>
  );
}
