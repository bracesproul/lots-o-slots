import { BadgeVariant } from '@/components';
import { PaymentProvider } from '@/generated/graphql';
import { GameType } from './types';

export const findGameTypeFromString = (gameType: string): GameType => {
  switch (gameType) {
    case 'POKER':
      return GameType.POKER;
    case 'SLOTS':
      return GameType.SLOTS;
    default:
      return GameType.POKER;
  }
};

export const findStringFromGameType = (
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

export const findBadgeVariantFromPaymentType = (
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

export const findStringFromPaymentType = (
  paymentType: PaymentProvider | null
): string => {
  switch (paymentType) {
    case PaymentProvider.ZELLE:
      return 'Zelle';
    case PaymentProvider.PAYPAL:
      return 'PayPal';
    case PaymentProvider.CASHAPP:
      return 'CashApp';
    case PaymentProvider.BITCOIN:
      return 'Bitcoin';
    case PaymentProvider.ETHEREUM:
      return 'Ethereum';
    default:
      return '';
  }
};
