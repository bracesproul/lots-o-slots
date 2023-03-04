import React, { ReactElement, useState } from 'react';
import { Button } from '@/components';
import { GameSelectionCards, RadioButtons } from './components';
import { PlayNowDialog } from '../';
import { DialogStage, GameType } from '@/features/play-now-dialog-depd/types';
import { PaymentProvider } from '@/generated/graphql';

export type GameSelectionProps = {
  selectedGame: GameType | null;
  setSelectedGame: (selectedGame: GameType | null) => void;

  handleSubmit: () => void;

  showSkrill?: boolean;

  depositDialogStepOneOpen: boolean;
  setDepositDialogStepOneOpen: (depositDialogOpen: boolean) => void;

  depositDialogStepTwoOpen: boolean;
  setDepositDialogStepTwoOpen: (depositDialogOpen: boolean) => void;

  paymentProvider: PaymentProvider;
  setPaymentProvider: (paymentProvider: PaymentProvider) => void;
};

function GameSelection(props: GameSelectionProps): ReactElement {
  const p = { ...props };
  const { selectedGame, setSelectedGame, handleSubmit } = p;
  const [stage, setStage] = useState(DialogStage.STAGE_TWO);

  const handleStageChange = (newStage: DialogStage) => {
    if (newStage === DialogStage.STAGE_TWO) {
      p.setDepositDialogStepOneOpen(false);
      p.setDepositDialogStepTwoOpen(true);
    } else if (newStage === DialogStage.STAGE_ONE) {
      p.setDepositDialogStepTwoOpen(false);
      p.setDepositDialogStepOneOpen(true);
    }
    setStage(newStage);
  };

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
          size="xlarge"
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
        stepOneOpen={p.depositDialogStepOneOpen}
        setStepOneOpen={p.setDepositDialogStepOneOpen}
        stepTwoOpen={p.depositDialogStepTwoOpen}
        setStepTwoOpen={p.setDepositDialogStepTwoOpen}
        stage={stage}
        setStage={handleStageChange}
        includePaymentIdentifier
        gameType={selectedGame ?? GameType.POKER}
        setGameType={setSelectedGame}
      />
    </div>
  );
}

export default function GameSelectionContainer(): ReactElement {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(
    GameType.POKER
  );
  const [depositDialogStepOneOpen, setDepositDialogStepOneOpen] =
    useState(false);
  const [depositDialogStepTwoOpen, setDepositDialogStepTwoOpen] =
    useState(false);
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>(
    PaymentProvider.PAYPAL
  );

  const handleSubmit = () => {
    setDepositDialogStepTwoOpen(true);
  };

  return (
    <GameSelection
      selectedGame={selectedGame}
      setSelectedGame={setSelectedGame}
      handleSubmit={handleSubmit}
      depositDialogStepOneOpen={depositDialogStepOneOpen}
      setDepositDialogStepOneOpen={setDepositDialogStepOneOpen}
      depositDialogStepTwoOpen={depositDialogStepTwoOpen}
      setDepositDialogStepTwoOpen={setDepositDialogStepTwoOpen}
      paymentProvider={paymentProvider}
      setPaymentProvider={setPaymentProvider}
    />
  );
}
