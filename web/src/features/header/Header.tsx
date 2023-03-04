import { ReactElement, useState } from 'react';
import { Button, GenerateAccountDialog, PlayNowDialog } from '@/components';
import { DialogStage, GameType } from '../play-now-dialog-depd/types';
import { PaymentProvider } from '@/generated/graphql';
import { AppStoreButtonsDialog } from '..';

export type HeaderProps = {
  slotsSectionRef: React.RefObject<HTMLDivElement>;
  pokerSectionRef: React.RefObject<HTMLDivElement>;
};

export default function Header(props: HeaderProps): ReactElement {
  const { slotsSectionRef, pokerSectionRef } = props;
  const [generateAccountDialogOpen, setGenerateAccountDialogOpen] =
    useState(false);
  const [playNowStepOneOpen, setPlayNowStepOneOpen] = useState(false);
  const [playNowStepTwoOpen, setPlayNowStepTwoOpen] = useState(false);
  const [stage, setStage] = useState(DialogStage.STAGE_ONE);
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>(
    PaymentProvider.PAYPAL
  );
  const [gameType, setGameType] = useState<GameType | null>(null);

  const handleScrollToSlots = () => {
    slotsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToPoker = () => {
    pokerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="header">
      <div className="nav-container">
        <h2 className="lots-o-slots-logo">
          Lots <span className="red-span-text">{`O'`}</span> Slots
        </h2>
        <div className="nav-button-group">
          {/* <Button
            type="button"
            variant="secondary"
            onPress={() => setGenerateAccountDialogOpen(true)}
          >
            Generate Account
          </Button>
          <Button
            type="button"
            variant="primary"
            onPress={() => setPlayNowStepOneOpen(true)}
          >
            Play Now!
          </Button> */}
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
      <div className="title-container">
        <h1 className="header-text-top">Deposit</h1>
        <h1 className="header-text-bottom">& Play Now!</h1>
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
          paymentProvider={paymentProvider}
          setPaymentProvider={setPaymentProvider}
          stage={stage}
          setStage={setStage}
          stepOneOpen={playNowStepOneOpen}
          setStepOneOpen={setPlayNowStepOneOpen}
          stepTwoOpen={playNowStepTwoOpen}
          setStepTwoOpen={setPlayNowStepTwoOpen}
          gameType={gameType}
          setGameType={setGameType}
        />
      )}
    </div>
  );
}
