import React, { ReactElement, useState } from 'react';
import { Button } from '@/components';
import { GameSelectionCards, RadioButtons } from './components';
import { PlayNowDialog } from '../';
import { DialogStage, GameType } from '@/features/play-now-dialog/types';
import { PaymentProvider } from '@/generated/graphql';

export type GameSelectionProps = {
  selectedGame: GameType | null;
  setSelectedGame: (selectedGame: GameType | null) => void;
  handleSubmit: () => void;
  showSkrill?: boolean;
  depositDialogOpen: boolean;
  setDepositDialogOpen: (depositDialogOpen: boolean) => void;
  paymentProvider: PaymentProvider | null;
  setPaymentProvider: (paymentProvider: PaymentProvider | null) => void;
};

function GameSelection(props: GameSelectionProps): ReactElement {
  const p = { ...props };
  const { selectedGame, setSelectedGame, handleSubmit } = p;
  const [stage, setStage] = useState(DialogStage.STAGE_TWO);

  return (
    <div className={'game-selection-container'}>
      <div className="game-selection-left">
        <GameSelectionCards
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
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
        paymentProvider={p.paymentProvider}
        setPaymentProvider={p.setPaymentProvider}
        open={p.depositDialogOpen}
        setOpen={p.setDepositDialogOpen}
        stage={stage}
        setStage={setStage}
        includePaymentIdentifier
        gameType={selectedGame}
        setGameType={setSelectedGame}
      />
    </div>
  );
}

export default function GameSelectionContainer(): ReactElement {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(
    GameType.POKER
  );
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [paymentProvider, setPaymentProvider] =
    useState<PaymentProvider | null>(PaymentProvider.PAYPAL);

  const handleSubmit = () => {
    setDepositDialogOpen(true);
  };

  return (
    <GameSelection
      selectedGame={selectedGame}
      setSelectedGame={setSelectedGame}
      handleSubmit={handleSubmit}
      depositDialogOpen={depositDialogOpen}
      setDepositDialogOpen={setDepositDialogOpen}
      paymentProvider={paymentProvider}
      setPaymentProvider={setPaymentProvider}
    />
  );
}
