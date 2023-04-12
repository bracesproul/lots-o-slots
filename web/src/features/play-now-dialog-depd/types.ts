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
  stepOneOpen: boolean;
  setStepOneOpen: (open: boolean) => void;

  stepTwoOpen: boolean;
  setStepTwoOpen: (open: boolean) => void;

  stage: DialogStage;
  setStage: (stage: DialogStage) => void;

  gameType: GameType;
  setGameType: (gameType: GameType) => void;

  paymentProvider: PaymentProvider;
  setPaymentProvider: (paymentProvider: PaymentProvider) => void;

  includePaymentIdentifier?: boolean;
};

export type PlayDialogProps = {
  gameType?: GameType | null;
  setGameType: (gameType: GameType) => void;
  paymentProvider: PaymentProvider;
  setPaymentProvider: (paymentProvider: PaymentProvider) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isNextDisabled: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  paymentIdentifier: string;
  setPaymentIdentifier: (paymentIdentifier: string) => void;
};

export type DepositDialogProps = {
  paymentProvider: PaymentProvider;
  paymentHandle: string | null;
  depositAmount: number;
  setDepositAmount: (depositAmount: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isConfirmPaidDisabled: boolean;
  error: boolean;
  paymentIdentifier: string;
  setPaymentIdentifier: (paymentIdentifier: string) => void;
  includePaymentIdentifier: boolean;
  /** The users firekin username */
  username: string;
  setUsername: (username: string) => void;
};
