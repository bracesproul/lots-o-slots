import { Button, Dialog, Input, Select, Badge } from '@/components';
import { FormEvent, ReactElement, useEffect, useState } from 'react';
import { PaymentProvider } from '@/generated/graphql';
import Countdown from 'react-countdown';
import { BadgeVariant } from '@/components';

export type PlayNowDialogProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedGame: string;
  setSelectedGame: (selectedGame: string) => void;
  paymentProvider: PaymentProvider | null;
  setPaymentProvider: (paymentProvider: PaymentProvider) => void;
  setDepositDialogOpen: (open: boolean) => void;
};

const PREFIX = 'play-now-dialog';

const DEPOSIT_PREFIX = 'deposit-dialog';

const GAME_OPTIONS = [
  { name: 'Slots', value: 'slots' },
  { name: 'Poker', value: 'poker' },
];

const PAYMENT_OPTIONS = [
  { name: 'PayPal', value: PaymentProvider.PAYPAL },
  { name: 'CashApp', value: PaymentProvider.CASHAPP },
  { name: 'Zelle', value: PaymentProvider.ZELLE },
];

const COUNTDOWN_TIMER = 900000;

function StepOneDialog(props: PlayDialogProps): ReactElement {
  const p = { ...props };
  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title="Play Now"
      buttonTitle="Close"
    >
      <form className={`${PREFIX}-dialog-form`} onSubmit={(e) => p.onSubmit(e)}>
        <label className={`${PREFIX}-form-label`}>Please Select a Game</label>
        <Select
          placeholder="Please select one"
          options={GAME_OPTIONS}
          required
          value={findStringFromGameType(p.gameType)}
          onValueChange={(e) => p.setGameType(findGameTypeFromString(e))}
        />
        <label className={`${PREFIX}-form-label`}>
          Please Select a Payment Type
        </label>
        <Select
          placeholder="Please select one"
          options={PAYMENT_OPTIONS}
          required
          value={p.paymentProvider ?? undefined}
          onValueChange={(e) => {
            switch (e) {
              case 'ZELLE':
                p.setPaymentProvider(PaymentProvider.ZELLE);
                break;
              case 'PAYPAL':
                p.setPaymentProvider(PaymentProvider.PAYPAL);
                break;
              case 'CASHAPP':
                p.setPaymentProvider(PaymentProvider.CASHAPP);
                break;
            }
          }}
        />
        <Button
          className={`${PREFIX}-form-submit`}
          type="submit"
          isDisabled={p.isNextDisabled}
        >
          Next
        </Button>
      </form>
    </Dialog>
  );
}

function StepTwoDialog(props: DepositDialogProps): ReactElement {
  const p = { ...props };
  const [isCountdownOver, setIsCountdownOver] = useState(false);

  useEffect(() => {
    if (isCountdownOver && !p.open) {
      setIsCountdownOver(false);
    }
  }, [isCountdownOver, p.open]);

  return (
    <Dialog
      open={p.open}
      onOpenChange={p.setOpen}
      title={!isCountdownOver ? 'Complete Payment' : 'Expired'}
      description={
        !isCountdownOver
          ? 'Please follow the instructions below on how to pay.'
          : undefined
      }
      buttonTitle="Close"
    >
      <div className={`${DEPOSIT_PREFIX}`}>
        {!isCountdownOver ? (
          <>
            <label className={`${DEPOSIT_PREFIX}-form-label`}>
              Deposit Amount
            </label>
            <Input
              type="number"
              value={p.depositAmount.toString()}
              onChange={(e) => p.setDepositAmount(Number(e))}
            />
            {p.depositAmount > 0 ? (
              <>
                <h1 className={`${DEPOSIT_PREFIX}-send-title`}>
                  Please send{' '}
                  <span className={`${DEPOSIT_PREFIX}-special-text`}>
                    ${p.depositAmount}
                  </span>{' '}
                  to the below address.
                </h1>
                <Countdown
                  className={'text-white mt-[5px]'}
                  date={Date.now() + COUNTDOWN_TIMER}
                  onComplete={() => setIsCountdownOver(true)}
                />
                <p className={`${DEPOSIT_PREFIX}-sub-text`}>
                  You have 15 minutes to pay. Please click confirm paid once
                  finished. Thank you!
                </p>
                <div className={'flex flex-row m-auto gap-2'}>
                  <Badge
                    variant={findBadgeVariantFromPaymentType(p.paymentProvider)}
                  >
                    {findStringFromPaymentType(p.paymentProvider)}
                  </Badge>
                  <Badge
                    variant={findBadgeVariantFromPaymentType(p.paymentProvider)}
                  >
                    {p.paymentHandle}
                  </Badge>
                </div>
              </>
            ) : (
              <></>
            )}
            <Button className={`${DEPOSIT_PREFIX}-form-submit`} type="button">
              Confirm Paid
            </Button>
          </>
        ) : (
          <>
            <h1 className={`${DEPOSIT_PREFIX}-expired`}>Time Expired</h1>
            <p className={`${DEPOSIT_PREFIX}-expired-body`}>
              Your payment window has expired. Please try again.
            </p>
          </>
        )}
      </div>
    </Dialog>
  );
}

export enum DialogStage {
  STAGE_ONE = 'STAGE_ONE',
  STAGE_TWO = 'STAGE_TWO',
}

export enum GameType {
  POKER = 'POKER',
  SLOTS = 'SLOTS',
}

type PlayGameDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;

  stage: DialogStage;
  setStage: (stage: DialogStage) => void;

  gameType?: GameType;

  paymentProvider: PaymentProvider | null;
  setPaymentProvider: (paymentProvider: PaymentProvider | null) => void;
};

type PlayDialogProps = {
  gameType: GameType | null;
  setGameType: (gameType: GameType) => void;
  paymentProvider: PaymentProvider | null;
  setPaymentProvider: (paymentProvider: PaymentProvider | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isNextDisabled: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type DepositDialogProps = {
  paymentProvider: PaymentProvider;
  paymentHandle: string;
  depositAmount: number;
  setDepositAmount: (depositAmount: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const findGameTypeFromString = (gameType: string): GameType => {
  switch (gameType) {
    case 'POKER':
      return GameType.POKER;
    case 'SLOTS':
      return GameType.SLOTS;
    default:
      return GameType.POKER;
  }
};

const findStringFromGameType = (
  gameType: GameType | null
): string | undefined => {
  switch (gameType) {
    case GameType.POKER:
      return 'POKER';
    case GameType.SLOTS:
      return 'SLOTS';
    default:
      return undefined;
  }
};

const findBadgeVariantFromPaymentType = (
  paymentType: PaymentProvider | null
): BadgeVariant => {
  switch (paymentType) {
    case PaymentProvider.ZELLE:
      return 'primary';
    case PaymentProvider.PAYPAL:
      return 'info';
    case PaymentProvider.CASHAPP:
      return 'success';
    case PaymentProvider.BITCOIN:
      return 'warning';
    case PaymentProvider.ETHEREUM:
      return 'info';
    default:
      return 'default';
  }
};

const findStringFromPaymentType = (
  paymentType: PaymentProvider | null
): string => {
  switch (paymentType) {
    case PaymentProvider.ZELLE:
      return 'Zelle';
    case PaymentProvider.PAYPAL:
      return 'PayPal';
    case PaymentProvider.CASHAPP:
      return 'CashApp';
    default:
      return '';
  }
};

export default function PlayNowDialogContainer(
  props: PlayGameDialogProps
): ReactElement {
  const p = { ...props };
  const [gameType, setGameType] = useState<GameType | null>(p.gameType ?? null);
  const [depositAmount, setDepositAmount] = useState(0);
  const TEMP_PAYMENT_HANDLE = 'zelle@example.com';

  useEffect(() => {
    if (!p.open) {
      setGameType(null);
      p.setPaymentProvider(null);
      setDepositAmount(0);
    }
  }, [p.open]);

  useEffect(() => {
    console.log('stage', p.stage, p.paymentProvider);
  }, [p.stage]);

  return (
    <>
      {p.stage === DialogStage.STAGE_ONE ? (
        <StepOneDialog
          open={p.open}
          setOpen={p.setOpen}
          isNextDisabled={gameType ? false : true}
          gameType={gameType}
          setGameType={setGameType}
          paymentProvider={p.paymentProvider}
          setPaymentProvider={p.setPaymentProvider}
          onSubmit={(e) => {
            e.preventDefault();
            p.setStage(DialogStage.STAGE_TWO);
          }}
        />
      ) : (
        <>
          {p.paymentProvider && (
            <StepTwoDialog
              open={p.open}
              setOpen={p.setOpen}
              depositAmount={depositAmount}
              setDepositAmount={setDepositAmount}
              paymentProvider={p.paymentProvider}
              paymentHandle={TEMP_PAYMENT_HANDLE}
            />
          )}
        </>
      )}
    </>
  );
}
