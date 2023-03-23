import { registerEnumType } from 'type-graphql';

export enum PaymentType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  PAYOUT = 'PAYOUT',
}

// New
export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

registerEnumType(PaymentStatus, { name: 'PaymentStatus' });

registerEnumType(PaymentType, { name: 'PaymentType' });
