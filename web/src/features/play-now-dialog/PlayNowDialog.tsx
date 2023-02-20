import { FormEvent, ReactElement, useEffect, useState } from 'react';
import { GetDefaultAccountsQuery, PaymentProvider } from '@/generated/graphql';
import { PlayGameDialogProps, DialogStage } from './types';
import { StepOneDialog, StepTwoDialog, SuccessDialog } from './components';
import { useCreateUserPaymentMutation } from '@/generated/graphql';
import { findUserId } from '@/utils';
import { useGetDefaultAccountsQuery } from '@/generated/graphql';

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
  const [paymentIdentifier, setPaymentIdentifier] = useState('');
  const [createUserPayment] = useCreateUserPaymentMutation();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data } = useGetDefaultAccountsQuery();

  const getPaymentHandle = (
    data: GetDefaultAccountsQuery,
    paymentProvider: PaymentProvider
  ): string | null => {
    const handle = data.getAllAccounts.find(
      (account) => account.type === paymentProvider
    );

    switch (paymentProvider) {
      case PaymentProvider.ZELLE:
        return handle?.email ?? null;
      case PaymentProvider.CASHAPP:
        return handle?.cashtag ?? null;
      case PaymentProvider.PAYPAL:
        return handle?.email ?? null;
      case PaymentProvider.BITCOIN:
        return handle?.bitcoinAddress ?? null;
      case PaymentProvider.ETHEREUM:
        return handle?.ethereumAddress ?? null;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!p.stepOneOpen && !p.stepTwoOpen) {
      p.setGameType(null);
      p.setPaymentProvider(null);
      setDepositAmount(0);
    }
  }, [p.stepOneOpen, p.stepTwoOpen]);

  useEffect(() => {
    if (success) {
      p.setStepOneOpen(false);
      p.setStepTwoOpen(false);
    }
  }, [success]);

  const paymentHandle = () => {
    if (data && p.paymentProvider) {
      return getPaymentHandle(data, p.paymentProvider);
    } else {
      return null;
    }
  };

  return (
    <>
      {p.stage === DialogStage.STAGE_ONE ? (
        <StepOneDialog
          open={p.stepOneOpen}
          setOpen={p.setStepOneOpen}
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
            p.setStepOneOpen(false);
            p.setStage(DialogStage.STAGE_TWO);
          }}
        />
      ) : (
        <>
          {p.paymentProvider && (
            <StepTwoDialog
              isConfirmPaidDisabled={
                p.paymentProvider && depositAmount >= 20 ? false : true
              }
              open={p.stepTwoOpen}
              setOpen={p.setStepTwoOpen}
              depositAmount={depositAmount}
              setDepositAmount={setDepositAmount}
              paymentProvider={p.paymentProvider}
              paymentHandle={paymentHandle()}
              paymentIdentifier={paymentIdentifier}
              setPaymentIdentifier={setPaymentIdentifier}
              includePaymentIdentifier={p.includePaymentIdentifier ?? false}
              error={error}
              onSubmit={async (e) => {
                e.preventDefault();
                if (!p.paymentProvider || !p.gameType) {
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
                  setError(true);
                } else {
                  setSuccess(true);
                }
              }}
            />
          )}
          {success && <SuccessDialog open={success} setOpen={setSuccess} />}
        </>
      )}
    </>
  );
}
