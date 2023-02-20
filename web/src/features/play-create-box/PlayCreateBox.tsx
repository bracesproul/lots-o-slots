import {
  GameButton,
  Button,
  GenerateAccountDialog,
  PlayNowDialog,
} from '@/components';
import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { PaymentProvider } from '@/generated/graphql';
import { DialogStage, GameType } from '../play-now-dialog/types';

export type PlayCreateBoxProps = {
  className?: string;
  /**
   * Whether the card should show all (2) button rows.
   * If false it will show one.
   * @default true
   */
  showAll?: boolean;
};

const DEFAULT_PROPS = {
  showAll: true,
};

export default function PlayCreateBox(
  props?: PlayCreateBoxProps
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const [generateAccountDialogOpen, setGenerateAccountDialogOpen] =
    useState(false);
  const [playNowStepOneOpen, setPlayNowStepOneOpen] = useState(false);
  const [playNowStepTwoOpen, setPlayNowStepTwoOpen] = useState(false);
  const [stage, setStage] = useState(DialogStage.STAGE_ONE);
  const [paymentProvider, setPaymentProvider] =
    useState<PaymentProvider | null>(null);
  const [gameType, setGameType] = useState<GameType | null>(null);

  const handleStageChange = (newStage: DialogStage) => {
    if (newStage === DialogStage.STAGE_TWO) {
      setPlayNowStepTwoOpen(true);
    } else if (newStage === DialogStage.STAGE_ONE) {
      setPlayNowStepOneOpen(true);
    }
    setStage(newStage);
  };

  return (
    <div className={clsx(['action-container', p.className])}>
      <h3 className="action-card-header">
        Action button card container blank title one
      </h3>
      <div className={clsx('play-create-box-container')}>
        <div className="game-selection-left-container">
          {p.showAll && (
            <GameButton
              title="Game 1"
              leftIconType="redChip"
              rightIconType="link"
              rightIconRedBackground
            />
          )}
          <GameButton
            title="Game 1"
            leftIconType="blackChip"
            rightIconType="link"
            rightIconRedBackground
          />
        </div>
        <div className="action-buttons-middle-container">
          {p.showAll && (
            <Button
              type="button"
              variant="primary"
              onPress={() => setPlayNowStepOneOpen(true)}
            >
              Play Now
            </Button>
          )}
          <Button
            type="button"
            variant="primary"
            onPress={() => setPlayNowStepOneOpen(true)}
          >
            Play Now
          </Button>
        </div>
        <div className="action-buttons-right-container">
          {p.showAll && (
            <Button
              type="button"
              variant="secondary"
              onPress={() => setGenerateAccountDialogOpen(true)}
            >
              Create Account
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            onPress={() => setGenerateAccountDialogOpen(true)}
          >
            Create Account
          </Button>
        </div>
      </div>
      <PlayNowDialog
        paymentProvider={paymentProvider}
        setPaymentProvider={setPaymentProvider}
        stage={stage}
        setStage={handleStageChange}
        stepOneOpen={playNowStepOneOpen}
        setStepOneOpen={setPlayNowStepOneOpen}
        stepTwoOpen={playNowStepTwoOpen}
        setStepTwoOpen={setPlayNowStepTwoOpen}
        gameType={gameType}
        setGameType={setGameType}
      />
      <GenerateAccountDialog
        open={generateAccountDialogOpen}
        setOpen={setGenerateAccountDialogOpen}
      />
    </div>
  );
}
