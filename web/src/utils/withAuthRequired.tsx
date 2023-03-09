import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { initializeApollo } from './apollo';
import { NormalizedCacheObject } from '@apollo/client';
import { createServerSupabaseClient, Session, User } from '@supabase/auth-helpers-nextjs'
import { PageType } from '@/types';

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
    pageType: PageType,
    options?: {
      redirect?: boolean;
    }
  ) =>
  async (context: GetServerSidePropsContext): Promise<WithAuthResult> => {
    let incomingApolloState: NormalizedCacheObject | null = null;
  
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

      session = supabaseSession;

      if (!session) {
        if (!options?.redirect) {
          return {
            props: {
              initialApolloState,
            },
          }
        }
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

      if (pageType === PageType.LOGIN || pageType === PageType.SIGNUP) {
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
  
      if (session.user.user_metadata.role === 'ADMIN') {
        if (pageType === PageType.ADMIN) {
          return {
            props: {
              initialApolloState,
              supabaseSession: session,
            },
          }
        }
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
        if (pageType === PageType.USER) {
          return {
            props: {
              initialApolloState,
              supabaseSession: session,
            },
          }
        }
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