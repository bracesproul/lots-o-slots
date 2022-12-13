import { User, Payment } from '@/entities';

export type PayoutUserReturnType = {
  user: User | null;
  payment: Payment | null;
  success: boolean;
  message: string;
};
