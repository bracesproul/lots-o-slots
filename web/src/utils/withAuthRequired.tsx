import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { CheckAuthDocument, CheckAuthQuery, useCheckAuthLazyQuery } from '@/generated/graphql';
import { initializeApollo } from './apollo';
import { NormalizedCacheObject } from '@apollo/client';
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs'

export const STORAGE_KEY = 'lS_lots_o_slots_auth';

type WithAuthRequiredValue = {
  authed: boolean;
};

type WithAuthResult = GetServerSidePropsResult<{
  initialApolloState: NormalizedCacheObject;
  user?: User;
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

    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(context)
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (password && options?.isAuthPage) {
      const response = await apolloClient
      .query<CheckAuthQuery>({
        query: CheckAuthDocument,
        variables: {
          password,
        },
      })
      .catch(() => {
        // no op
      });
      const isAuthed = response?.data.checkAdminPagePassword.success

      if (!isAuthed) {
        return {
          redirect: {
            destination: '/admin/authorize',
            permanent: false,
          },
        };
      } else {
        return {
          props: {
            initialApolloState: apolloClient.cache.extract(),
          },
        };
      }
    } else { console.log('no password') }

    if (options?.redirect === true && !options?.isFromAuthPage) {
      return {
        redirect: {
          destination: '/admin/authorize',
          permanent: false,
        },
      };
    }

    const initialApolloState = apolloClient.cache.extract();

    return {
      props: {
        initialApolloState,
        user: session?.user,
      },
    };
  };