import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { CheckAuthDocument, CheckAuthQuery, useCheckAuthLazyQuery } from '@/generated/graphql';
import { initializeApollo } from './apollo';
import { NormalizedCacheObject } from '@apollo/client';
import { createServerSupabaseClient, Session, User } from '@supabase/auth-helpers-nextjs'

export const STORAGE_KEY = 'lS_lots_o_slots_auth';

type WithAuthRequiredValue = {
  authed: boolean;
};

type WithAuthResult = GetServerSidePropsResult<{
  initialApolloState: NormalizedCacheObject;
  supabaseSession?: Session | null;
}>;

type IncomingGetServerSideProps = GetServerSideProps<{
  initialApolloState?: NormalizedCacheObject;
}>;

export const withAuthRequired =
  (
    incomingGetServerSideProps: IncomingGetServerSideProps | null = null,
    options?: {
      redirect?: boolean;
      isFromAuthPage?: boolean;
      isAuthPage?: boolean;
    }
  ) =>
  async (context: GetServerSidePropsContext): Promise<WithAuthResult> => {
    let incomingApolloState: NormalizedCacheObject | null = null;
    const parsedCookies = cookie.parse(context.req.headers.cookie ?? '');
    const password = parsedCookies[STORAGE_KEY];
  
    const apolloClient = initializeApollo(incomingApolloState, {
      cookie: context.req.headers.cookie,
    });

    const initialApolloState = apolloClient.cache.extract();

    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(context)

    let session: Session | null = null;

    // Set session from query params
    if (context.query?.accessToken && context.query?.refreshToken) {
      const access_token = decodeURIComponent(context.query.accessToken as string);
      const refresh_token = decodeURIComponent(context.query.refreshToken as string);
      const {
        data: { session: supabaseSession },
      } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      session = supabaseSession;
    } else {
      // Check if we have a session
      const {
        data: { session: supabaseSession },
      } = await supabase.auth.getSession();
      console.log('no qp, checking session', supabaseSession)

      session = supabaseSession;

      if (!session) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
          props: {
            initialApolloState,
            supabaseSession: session,
          },
        };
      }
  
      if (session.user.user_metadata.role === 'ADMIN') {
        return {
          redirect: {
            destination: '/admin',
            permanent: false,
          },
          props: {
            initialApolloState,
            supabaseSession: session,
          },
        };
      }
  
      if (session.user.user_metadata.role === 'USER') {
        return {
          redirect: {
            destination: '/user',
            permanent: false,
          },
          props: {
            initialApolloState,
            supabaseSession: session,
          },
        };
      }
    }

    return {
      props: {
        initialApolloState,
        supabaseSession: session,
      },
    }
  };