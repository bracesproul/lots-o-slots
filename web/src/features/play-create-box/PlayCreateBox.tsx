import {
  GameButton,
  Button,
  GenerateAccountDialog,
  PlayNowDialog,
} from '@/components';
import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { DepositDialog } from '../deposit-dialog';
import { PaymentProvider } from '@/generated/graphql';

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
  const [playNowDialogOpen, setPlayNowDialogOpen] = useState(false);
  const [paymentProvider, setPaymentProvider] =
    useState<PaymentProvider | null>(null);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);

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
              onPress={() => setPlayNowDialogOpen(true)}
            >
              Play Now
            </Button>
          )}
          <Button
            type="button"
            variant="primary"
            onPress={() => setPlayNowDialogOpen(true)}
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
      <GenerateAccountDialog
        open={generateAccountDialogOpen}
        setOpen={setGenerateAccountDialogOpen}
      />
      <PlayNowDialog
        paymentProvider={paymentProvider}
        setPaymentProvider={setPaymentProvider}
        open={playNowDialogOpen}
        setOpen={setPlayNowDialogOpen}
        setDepositDialogOpen={setDepositDialogOpen}
      />
      <DepositDialog
        open={depositDialogOpen}
        setOpen={setDepositDialogOpen}
        paymentType={paymentProvider}
      />
    </div>
  );
}
