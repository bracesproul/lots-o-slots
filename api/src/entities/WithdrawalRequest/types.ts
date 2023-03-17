import { registerEnumType } from 'type-graphql';

export enum WithdrawalRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

registerEnumType(WithdrawalRequestStatus, { name: 'WithdrawalRequestStatus' });
