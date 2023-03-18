import { UserV2 } from '@/entities';
import { UserRole } from '@/entities/UserV2/types';
import {
  SignInWithEmailPasswordResponse,
  SignUpWithEmailPasswordResponse,
} from '@/services/subabase/auth/types';

export type GetAllInput = {
  /**
   * How the results should be ordered
   * @default 'createdAt'
   */
  orderBy?: 'createdAt' | 'updatedAt';
};
