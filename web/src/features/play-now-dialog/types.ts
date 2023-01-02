import { PaymentProvider } from '@/generated/graphql';

export enum DialogStage {
  STAGE_ONE = 'STAGE_ONE',
  STAGE_TWO = 'STAGE_TWO',
}

export enum GameType {
  POKER = 'POKER',
  SLOTS = 'SLOTS',
}

export type PlayGameDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;

  stage: DialogStage;
  setStage: (stage: DialogStage) => void;

  gameType?: GameType;

  paymentProvider: PaymentProvider | null;
  setPaymentProvider: (paymentProvider: PaymentProvider | null) => void;
};

export type PlayDialogProps = {
  gameType: GameType | null;
  setGameType: (gameType: GameType) => void;
  paymentProvider: PaymentProvider | null;
  setPaymentProvider: (paymentProvider: PaymentProvider | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isNextDisabled: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type DepositDialogProps = {
  paymentProvider: PaymentProvider;
  paymentHandle: string;
  depositAmount: number;
  setDepositAmount: (depositAmount: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};
