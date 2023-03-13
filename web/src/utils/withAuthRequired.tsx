import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { initializeApollo } from './apollo';
import { NormalizedCacheObject } from '@apollo/client';
import {
  createServerSupabaseClient,
  Session,
  User,
} from '@supabase/auth-helpers-nextjs';
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
    const incomingApolloState: NormalizedCacheObject | null = null;

    const apolloClient = initializeApollo(incomingApolloState, {
      cookie: context.req.headers.cookie,
    });

    const initialApolloState = apolloClient.cache.extract();

    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(context);

    let session: Session | null = null;

    const {
      data: { session: supabaseSession },
    } = await supabase.auth.getSession();

    session = supabaseSession;

    if (!session) {
      if (context.query?.accessToken && context.query?.refreshToken) {
        // No session but tokens are in URL. Occurs after a user signs up/logs in.
        const access_token = decodeURIComponent(
          context.query.accessToken as string
        );
        const refresh_token = decodeURIComponent(
          context.query.refreshToken as string
        );
        const {
          data: { session: supabaseSession },
        } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        session = supabaseSession;
      } else {
        if (options?.redirect === false) {
          // No session and no tokens in URL. Redirects to login page or no redirect if the option is set.
          return {
            props: {
              initialApolloState,
            },
          };
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
    } else {
      // Session is true
      if (pageType === PageType.LOGIN || pageType === PageType.SIGNUP) {
        // Prevent logged in users from accessing login/signup pages
        return {
          redirect: {
            destination:
              session.user.user_metadata.role === 'USER' ? '/user' : '/admin',
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
          };
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

      if (session.user.user_metadata.role === 'ADMIN') {
        // If admin is already logged in, redirect to /admin
        if (pageType === PageType.ADMIN) {
          return {
            props: {
              initialApolloState,
              supabaseSession: session,
            },
          };
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
    }

    return {
      props: {
        initialApolloState,
        supabaseSession: session,
      },
    };
  };
