import { FormEvent, ReactElement, useEffect, useState } from 'react';
import { PaymentProvider } from '@/generated/graphql';
import { PlayGameDialogProps, GameType, DialogStage } from './types';
import { StepOneDialog, StepTwoDialog } from './components';

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
  const [gameType, setGameType] = useState<GameType | null>(p.gameType ?? null);
  const [depositAmount, setDepositAmount] = useState(0);
  const TEMP_PAYMENT_HANDLE = 'zelle@example.com';

  useEffect(() => {
    if (!p.open) {
      setGameType(null);
      p.setPaymentProvider(null);
      setDepositAmount(0);
    }
  }, [p.open]);

  return (
    <>
      {p.stage === DialogStage.STAGE_ONE ? (
        <StepOneDialog
          open={p.open}
          setOpen={p.setOpen}
          isNextDisabled={gameType ? false : true}
          gameType={gameType}
          setGameType={setGameType}
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
              open={p.open}
              setOpen={p.setOpen}
              depositAmount={depositAmount}
              setDepositAmount={setDepositAmount}
              paymentProvider={p.paymentProvider}
              paymentHandle={TEMP_PAYMENT_HANDLE}
            />
          )}
        </>
      )}
    </>
  );
}
