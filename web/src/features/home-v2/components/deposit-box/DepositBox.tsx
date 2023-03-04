import { StylePrefix } from '@/types/style-prefix';
import clsx from 'clsx';
import { ReactElement, useState } from 'react';
import { Button, ButtonCard, PlayNowDialog } from '@/components';
import { GameType, PaymentProvider } from '@/generated/graphql';
import { Mobile, Tablet, Desktop } from '@/utils';
import { RadioButtons } from '@/features/game-selection/components';
import { DialogStage } from '@/features/play-now-dialog-depd/types';

export type DepositBoxV2Props = {
  /** Optional class name for applying styles */
  className?: string;
  /** The selected game card */
  selectedGame: GameType | null;
  /** Handler for setting the game card */
  setSelectedGame: (game: GameType | null) => void;
  /** The selected payment provider */
  paymentProvider: PaymentProvider;
  /** Handler for setting the selected payment provider */
  setPaymentProvider: (paymentProvider: PaymentProvider) => void;
  /** Submit handler for when users click the deposit button */
  handleSubmit: () => void;
  /** State controlling which step the modal opens in */
  depositDialogStepTwoOpen: boolean;
  /** Handler for setting the state controlling which step the modal opens in */
  setDepositDialogStepTwoOpen: (depositDialogOpen: boolean) => void;
  /** The current stage the play now dialog displays */
  stage: DialogStage;
  /** Handler for setting the current stage the play now dialog displays */
  setStage: (stage: DialogStage) => void;
};

const PREFIX = StylePrefix.DEPOSIT_BOX_V2;

function DepositBoxV2(props: DepositBoxV2Props): ReactElement {
  const p = { ...props };
  return (
    <div className={clsx([PREFIX, p.className])}>
      <Mobile>
        <div className={`${PREFIX}-mobile`}>
          <div className={`${PREFIX}-button-cards-mobile`}>
            <ButtonCard
              title="Poker"
              image="cards"
              onPress={() => p.setSelectedGame(GameType.POKER)}
              isSelected={p.selectedGame === GameType.POKER}
            />
            <ButtonCard
              title="Slots"
              image="slots"
              onPress={() => p.setSelectedGame(GameType.SLOTS)}
              isSelected={p.selectedGame === GameType.SLOTS}
            />
          </div>
          <RadioButtons
            setPaymentProvider={p.setPaymentProvider}
            paymentProvider={p.paymentProvider}
          />
          <Button
            size="xlarge"
            className={'max-w-[150px]'}
            onPress={p.handleSubmit}
            type="submit"
            variant="secondary"
          >
            Deposit
          </Button>
        </div>
      </Mobile>
      <Tablet>
        <div className={`${PREFIX}-tablet`}>
          <div className={`${PREFIX}-button-cards`}>
            <ButtonCard
              title="Poker"
              image="cards"
              onPress={() => p.setSelectedGame(GameType.POKER)}
              isSelected={p.selectedGame === GameType.POKER}
            />
            <ButtonCard
              title="Slots"
              image="slots"
              onPress={() => p.setSelectedGame(GameType.SLOTS)}
              isSelected={p.selectedGame === GameType.SLOTS}
            />
          </div>
          <RadioButtons
            setPaymentProvider={p.setPaymentProvider}
            paymentProvider={p.paymentProvider}
          />
          <Button
            size="xlarge"
            className={'max-w-[150px]'}
            onPress={p.handleSubmit}
            type="submit"
            variant="secondary"
          >
            Deposit
          </Button>
        </div>
      </Tablet>
      <Desktop>
        <div className={`${PREFIX}-desktop`}>
          <div className={`${PREFIX}-button-cards`}>
            <ButtonCard
              title="Poker"
              image="cards"
              onPress={() => p.setSelectedGame(GameType.POKER)}
              isSelected={p.selectedGame === GameType.POKER}
            />
            <ButtonCard
              title="Slots"
              image="slots"
              onPress={() => p.setSelectedGame(GameType.SLOTS)}
              isSelected={p.selectedGame === GameType.SLOTS}
            />
          </div>
          <RadioButtons
            setPaymentProvider={p.setPaymentProvider}
            paymentProvider={p.paymentProvider}
          />
          <Button
            size="xlarge"
            className={'max-w-[150px]'}
            onPress={p.handleSubmit}
            type="submit"
            variant="secondary"
          >
            Deposit
          </Button>
        </div>
      </Desktop>
      <PlayNowDialog
        paymentProvider={p.paymentProvider}
        setPaymentProvider={p.setPaymentProvider}
        stepOneOpen={false}
        setStepOneOpen={() => undefined}
        stepTwoOpen={p.depositDialogStepTwoOpen}
        setStepTwoOpen={p.setDepositDialogStepTwoOpen}
        stage={p.stage}
        setStage={p.setStage}
        includePaymentIdentifier
        gameType={p.selectedGame ?? GameType.POKER}
        setGameType={p.setSelectedGame}
      />
    </div>
  );
}

export type DepositBoxV2ContainerProps = {
  /** Optional class name for applying styles */
  className?: string;
};

function DepositBoxV2Container(
  props: DepositBoxV2ContainerProps
): ReactElement {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>(
    PaymentProvider.PAYPAL
  );
  const [depositDialogStepTwoOpen, setDepositDialogStepTwoOpen] =
    useState(false);
  const [stage, setStage] = useState(DialogStage.STAGE_TWO);

  if (!selectedGame) {
    setSelectedGame(GameType.POKER);
  }

  const handleSubmit = () => {
    setDepositDialogStepTwoOpen(true);
  };

  return (
    <DepositBoxV2
      {...props}
      selectedGame={selectedGame}
      setSelectedGame={setSelectedGame}
      paymentProvider={paymentProvider}
      setPaymentProvider={setPaymentProvider}
      handleSubmit={handleSubmit}
      depositDialogStepTwoOpen={depositDialogStepTwoOpen}
      setDepositDialogStepTwoOpen={setDepositDialogStepTwoOpen}
      stage={stage}
      setStage={setStage}
    />
  );
}

export default DepositBoxV2Container;
