import { UserV2Repository } from '@/repositories';
import { Response, Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserV2 } from '@/entities';
import cookie from 'cookie';
import { Session } from '@supabase/supabase-js';

export const SUPABASE_USER_ID_COOKIE_KEY = 'lS_supabase_user_id';
export const SUPABASE_REFRESH_TOKEN_COOKIE_KEY = 'lS_supabase_refresh_token';

export const SUPABASE_USER_ID_COOKIE_KEY_NO_LS = 'supabase_user_id';
export const SUPABASE_REFRESH_TOKEN_COOKIE_KEY_NO_LS = 'supabase_refresh_token';

export type GetUserFromContextPayload = {
  user: UserV2 | null;
  supabaseId: string | null;
  supabaseRefreshToken: string | null;
};

export const getUserFromContext = async (
  req: Request,
  res: Response
): Promise<GetUserFromContextPayload> => {
  const cookies = cookie.parse(req.headers.cookie ?? '');

  const supabaseUserCookie = cookies[SUPABASE_USER_ID_COOKIE_KEY];
  const supabaseRefreshTokenCookie = cookies[SUPABASE_REFRESH_TOKEN_COOKIE_KEY];

  if (!supabaseUserCookie || !supabaseRefreshTokenCookie) {
    console.log(cookies);
    return {
      user: null,
      supabaseId: null,
      supabaseRefreshToken: null,
    };
  }

  const user = await getCustomRepository(UserV2Repository).getBySupabaseId(
    supabaseUserCookie
  );

  return {
    user,
    supabaseId: supabaseUserCookie,
    supabaseRefreshToken: supabaseRefreshTokenCookie,
  };
};
