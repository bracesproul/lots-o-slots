import { ReactElement, useState } from 'react';
import { Button, GenerateAccountDialog, PlayNowDialog } from '@/components';
import { DialogStage } from '../play-now-dialog/PlayNowDialog';
import { PaymentProvider } from '@/generated/graphql';

export type HeaderProps = {
  // add props
};

function Header(): ReactElement {
  const [generateAccountDialogOpen, setGenerateAccountDialogOpen] =
    useState(false);
  const [playNowDialogOpen, setPlayNowDialogOpen] = useState(false);
  const [stage, setStage] = useState(DialogStage.STAGE_ONE);
  const [paymentProvider, setPaymentProvider] =
    useState<PaymentProvider | null>(null);
  return (
    <div className="header">
      <div className="nav-container">
        <h2 className="lots-o-slots-logo">
          Lots <span className="red-span-text">{`O'`}</span> Slots
        </h2>
        <div className="nav-button-group">
          <Button
            type="button"
            variant="secondary"
            onPress={() => setGenerateAccountDialogOpen(true)}
          >
            Generate Account
          </Button>
          <Button
            type="button"
            variant="primary"
            onPress={() => setPlayNowDialogOpen(true)}
          >
            Play Now!
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
      <PlayNowDialog
        paymentProvider={paymentProvider}
        setPaymentProvider={setPaymentProvider}
        stage={stage}
        setStage={setStage}
        open={playNowDialogOpen}
        setOpen={setPlayNowDialogOpen}
      />
    </div>
  );
}

export default function HeaderContainer(): ReactElement {
  return <Header />;
}
