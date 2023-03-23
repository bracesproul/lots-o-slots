import { UserV2 } from '@/entities';
import { Session } from '@supabase/supabase-js';
import { Request, Response } from 'express';

export type ContextType = {
  req: Request;
  res: Response;
  user: UserV2 | null;
  supabaseRefreshToken: string | null;
};
