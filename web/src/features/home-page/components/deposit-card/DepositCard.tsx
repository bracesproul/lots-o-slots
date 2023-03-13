import { Button, ButtonCard, CircleButton, PlayNowDialog } from '@/components';
import { GameType, PaymentProvider } from '@/types';
import { StylePrefix } from '@/types/style-prefix';
import { ReactElement, useState } from 'react';
import type { IconBackgroundOptions } from '@/components/circle-button/CircleButton';
import {
  PayPalRadioIcon,
  ZelleRadioIcon,
  CashAppRadioIcon,
  BitcoinRadioIcon,
  EthereumRadioIcon,
} from './components';
import { Mobile, TabletAndAbove } from '@/utils/responsive';
import { DialogStage } from '@/features/play-now-dialog-depd/types';

type PaymentOptionsType = {
  icon: JSX.Element;
  iconBackground: IconBackgroundOptions;
  isSelected: boolean;
  onPress: () => void;
};

export type DepositCardProps = {
  className?: string;
  /** State variable for controlling the selected game type */
  selectedGame: GameType;
  /** State setter function for setting selected game type */
  setSelectedGame: (gameType: GameType) => void;
  /** State variable for controlling the selected payment provider type */
  selectedPaymentOption: PaymentProvider;
  /** State setter function for setting selected payment provider type */
  setSelectedPaymentOption: (paymentProvider: PaymentProvider) => void;
  /** A list of props to map over to display the payment provider radio options */
  paymentOptionProps: PaymentOptionsType[];
  /** State variable for controlling the current dialog stage */
  stage: DialogStage;
  /** State setter function for setting the current dialog stage */
  setStage: (stage: DialogStage) => void;
  /** State variable for controlling the dialog open state */
  stepOneOpen: boolean;
  /** State setter function for setting the dialog open state */
  setStepOneOpen: (open: boolean) => void;
  /** State variable for controlling the dialog open state */
  stepTwoOpen: boolean;
  /** State setter function for setting the dialog open state */
  setStepTwoOpen: (open: boolean) => void;
};

const PREFIX = StylePrefix.DEPOSIT_CARD;

const DepositTitle = (): ReactElement => (
  <div className={`${PREFIX}-wrapper`}>
    <div className={`${PREFIX}-text`}>
      <h1>
        <span className="red-span-text">Deposit</span>
      </h1>
      <h1>& Play Now!</h1>
    </div>
  </div>
);

const GameCards = (
  props: Pick<DepositCardProps, 'selectedGame' | 'setSelectedGame'>
): ReactElement => (
  <div className={`${PREFIX}-game-cards-wrapper`}>
    <ButtonCard
      title="Poker"
      image="cards"
      onPress={() => props.setSelectedGame(GameType.POKER)}
      isSelected={props.selectedGame === GameType.POKER}
    />
    <ButtonCard
      title="Slots"
      image="slots"
      onPress={() => props.setSelectedGame(GameType.SLOTS)}
      isSelected={props.selectedGame === GameType.SLOTS}
    />
  </div>
);

function DepositCard(props: DepositCardProps): ReactElement {
  const p = { ...props };

  return (
    <div className={`${PREFIX}-wrapper`}>
      <DepositTitle />
      <div className={`${PREFIX}-actions-wrapper`}>
        <GameCards {...p} />
        <div className={`${PREFIX}-payment-options-wrapper`}>
          {p.paymentOptionProps.map((option) => (
            <CircleButton key={option.iconBackground} {...option} />
          ))}
        </div>
        <div className={`${PREFIX}-submit-wrapper`}>
          <Mobile>
            <Button onPress={() => p.setStepTwoOpen(true)} variant="primary">
              Deposit
            </Button>
          </Mobile>
          <TabletAndAbove>
            <Button
              onPress={() => p.setStepTwoOpen(true)}
              size="xlarge"
              variant="primary"
            >
              Deposit
            </Button>
          </TabletAndAbove>
        </div>
      </div>
      <PlayNowDialog
        paymentProvider={p.selectedPaymentOption}
        setPaymentProvider={p.setSelectedPaymentOption}
        stepOneOpen={p.stepOneOpen}
        setStepOneOpen={p.setStepOneOpen}
        stepTwoOpen={p.stepTwoOpen}
        setStepTwoOpen={p.setStepTwoOpen}
        stage={p.stage}
        setStage={p.setStage}
        includePaymentIdentifier
        gameType={p.selectedGame}
        setGameType={p.setSelectedGame}
      />
    </div>
  );
}

export default function DepositCardContainer(): ReactElement {
  const [selectedGame, setSelectedGame] = useState<GameType>(GameType.POKER);
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<PaymentProvider>(PaymentProvider.PAYPAL);
  const [stage, setStage] = useState<DialogStage>(DialogStage.STAGE_TWO);
  const [stepOneOpen, setStepOneOpen] = useState<boolean>(false);
  const [stepTwoOpen, setStepTwoOpen] = useState<boolean>(false);

  const paymentOptions = [
    {
      iconBackground: 'white' as IconBackgroundOptions,
      icon: PayPalRadioIcon,
      isSelected: selectedPaymentOption === PaymentProvider.PAYPAL,
      onPress: () => setSelectedPaymentOption(PaymentProvider.PAYPAL),
    },
    {
      iconBackground: 'purple' as IconBackgroundOptions,
      icon: ZelleRadioIcon,
      isSelected: selectedPaymentOption === PaymentProvider.ZELLE,
      onPress: () => setSelectedPaymentOption(PaymentProvider.ZELLE),
    },
    {
      iconBackground: 'green' as IconBackgroundOptions,
      icon: CashAppRadioIcon,
      isSelected: selectedPaymentOption === PaymentProvider.CASHAPP,
      onPress: () => setSelectedPaymentOption(PaymentProvider.CASHAPP),
    },
    {
      iconBackground: 'yellow' as IconBackgroundOptions,
      icon: BitcoinRadioIcon,
      isSelected: selectedPaymentOption === PaymentProvider.BITCOIN,
      onPress: () => setSelectedPaymentOption(PaymentProvider.BITCOIN),
    },
    {
      iconBackground: 'blue' as IconBackgroundOptions,
      icon: EthereumRadioIcon,
      isSelected: selectedPaymentOption === PaymentProvider.ETHEREUM,
      onPress: () => setSelectedPaymentOption(PaymentProvider.ETHEREUM),
    },
  ];

  const handleStageChange = (newStage: DialogStage) => {
    if (newStage === DialogStage.STAGE_TWO) {
      setStepOneOpen(false);
      setStepTwoOpen(true);
    } else if (newStage === DialogStage.STAGE_ONE) {
      setStepTwoOpen(false);
      setStepOneOpen(true);
    }
    setStage(newStage);
  };

  return (
    <DepositCard
      selectedGame={selectedGame}
      setSelectedGame={setSelectedGame}
      selectedPaymentOption={selectedPaymentOption}
      setSelectedPaymentOption={setSelectedPaymentOption}
      paymentOptionProps={paymentOptions}
      stage={stage}
      setStage={handleStageChange}
      stepOneOpen={stepOneOpen}
      setStepOneOpen={setStepOneOpen}
      stepTwoOpen={stepTwoOpen}
      setStepTwoOpen={setStepTwoOpen}
    />
  );
}
