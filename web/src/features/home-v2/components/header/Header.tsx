import { Button, GenerateAccountDialog } from '@/components';
import { AppStoreButtonsDialog } from '@/features/app-store-buttons-dialog';
import { DialogStage } from '@/features/play-now-dialog-depd/types';
import { PaymentProvider, GameType } from '@/generated/graphql';
import { StylePrefix } from '@/types/style-prefix';
import { ReactElement, useState } from 'react';
import { PlayNowDialog } from '@/features';

export type HeaderProps = {
  slotsSectionRef: React.RefObject<HTMLDivElement>;
  pokerSectionRef: React.RefObject<HTMLDivElement>;
};

const PREFIX = StylePrefix.HEADER_V2;

export default function HeaderV2(props: HeaderProps): ReactElement {
  const { slotsSectionRef, pokerSectionRef } = props;
  const [generateAccountDialogOpen, setGenerateAccountDialogOpen] =
    useState(false);
  const [playNowStepOneOpen, setPlayNowStepOneOpen] = useState(false);
  const [playNowStepTwoOpen, setPlayNowStepTwoOpen] = useState(false);
  const [stage, setStage] = useState(DialogStage.STAGE_ONE);
  const [paymentProvider, setPaymentProvider] =
    useState<PaymentProvider | null>(null);
  const [gameType, setGameType] = useState<GameType | null>(null);

  const handleScrollToSlots = () => {
    slotsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToPoker = () => {
    pokerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-nav-container`}>
        <h2 className={`${PREFIX}-nav-logo`}>
          Lots <span className="red-span-text">{`O'`}</span> Slots
        </h2>
        <div className={`${PREFIX}-nav-actions`}>
          <Button
            type="button"
            variant="secondary"
            onPress={handleScrollToSlots}
          >
            Play Slots
          </Button>
          <Button type="button" variant="primary" onPress={handleScrollToPoker}>
            Play Poker
          </Button>
        </div>
      </div>
      <div className={`${PREFIX}-header-container`}>
        <h1>
          <span className="red-span-text">Deposit</span>
        </h1>
        <h1 className={`${PREFIX}-`}>& Play Now!</h1>
      </div>
      <GenerateAccountDialog
        open={generateAccountDialogOpen}
        setOpen={setGenerateAccountDialogOpen}
      />
      {process.env.NEXT_PUBLIC_APP_STORE_BUTTONS_DIALOG_ENABLED === 'true' && (
        <AppStoreButtonsDialog
          open={playNowStepOneOpen}
          setOpen={setPlayNowStepOneOpen}
        />
      )}
      {process.env.NEXT_PUBLIC_PLAY_NOW_DIALOG_ENABLED === 'true' && (
        <PlayNowDialog
          paymentProvider={paymentProvider ?? PaymentProvider.PAYPAL}
          setPaymentProvider={setPaymentProvider}
          stage={stage}
          setStage={setStage}
          stepOneOpen={playNowStepOneOpen}
          setStepOneOpen={setPlayNowStepOneOpen}
          stepTwoOpen={playNowStepTwoOpen}
          setStepTwoOpen={setPlayNowStepTwoOpen}
          gameType={gameType ?? GameType.POKER}
          setGameType={setGameType}
        />
      )}
    </div>
  );
}
