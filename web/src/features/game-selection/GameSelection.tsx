import React, { ReactElement, useState } from 'react';
import { Button, Badge } from '@/components';
import { GameSelectionCards, RadioButtons } from './components';
import { PlayNowDialog } from '../';
import { GameType } from '@/features/play-now-dialog/PlayNowDialog';
import { PaymentProvider } from '@/generated/graphql';

export type GameSelectionProps = {
  isCardGameSelected: boolean;
  setIsCardGameSelected: (isPokerSelected: boolean) => void;
  handleSubmit: () => void;
  showSkrill?: boolean;
  depositDialogOpen: boolean;
  setDepositDialogOpen: (depositDialogOpen: boolean) => void;
  paymentProvider: PaymentProvider;
  setPaymentProvider: (paymentProvider: PaymentProvider) => void;
};

function GameSelection(props: GameSelectionProps): ReactElement {
  const p = { ...props };
  const {
    isCardGameSelected,
    setIsCardGameSelected,
    handleSubmit,
  } = p;

  return (
    <div className={'game-selection-container'}>
      <div className="game-selection-left">
        <GameSelectionCards
          setIsCardGameSelected={setIsCardGameSelected}
          isCardGameSelected={isCardGameSelected}
        />
        <RadioButtons
          setPaymentProvider={p.setPaymentProvider}
          paymentProvider={p.paymentProvider}
        />
      </div>
      <div className="input-button-container">
        <Button
          className={'max-w-[150px]'}
          onPress={handleSubmit}
          type="submit"
          variant="secondary"
        >
          Deposit
        </Button>
      </div>
      <PlayNowDialog
        open={p.depositDialogOpen}
        setOpen={p.setDepositDialogOpen}
        paymentProvider={p.paymentProvider}
        gameType={isCardGameSelected ? GameType.POKER : GameType.SLOTS}
        stage={'stageTwo'}
      />
    </div>
  );
}

export default function GameSelectionContainer(): ReactElement {
  const [isPokerSelected, setIsPokerSelected] = useState(true);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState(
    PaymentProvider.PAYPAL
  );

  React.useEffect(() => {
    console.log('inside game selection container', paymentProvider);
  }, [paymentProvider, depositDialogOpen]);

  const handleSubmit = () => {
    console.log(paymentProvider);
    setDepositDialogOpen(true);
  };

  return (
    <GameSelection
      isCardGameSelected={isPokerSelected}
      setIsCardGameSelected={setIsPokerSelected}
      handleSubmit={handleSubmit}
      depositDialogOpen={depositDialogOpen}
      setDepositDialogOpen={setDepositDialogOpen}
      paymentProvider={paymentProvider}
      setPaymentProvider={setPaymentProvider}
    />
  );
}
