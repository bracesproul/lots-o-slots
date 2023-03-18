import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { initializeApollo } from './apollo';
import { NormalizedCacheObject } from '@apollo/client';
import {
  ADMIN_PAGES,
  PageType,
  SUPABASE_REFRESH_TOKEN_COOKIE_KEY_WITH_lS,
} from '@/types';
import {
  CheckUserSessionDocument,
  CheckUserSessionQuery,
  LogoutDocument,
  LogoutMutation,
  UserRole,
  UserV2,
} from '@/generated/graphql';
import { serialize } from 'cookie';

type WithAuthResult = GetServerSidePropsResult<{
  initialApolloState: NormalizedCacheObject;
  user?: Partial<UserV2> | null;
}>;

type IncomingGetServerSideProps = GetServerSideProps<{
  initialApolloState?: NormalizedCacheObject;
}>;
/**
 * Check for user id in cookies and refresh token
 * If no user id or refresh token, redirect to login page
 *
 * If user id and refresh token, hit server to get new refresh token
 *
 * Server should check for user id and refresh token in db
 * Then on response the server should also set cookies with the new refresh token
 */

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

    const checkSessionResponse = await apolloClient
      .query<CheckUserSessionQuery>({
        query: CheckUserSessionDocument,
      })
      .catch(() => {
        // no op
      });
    const user = checkSessionResponse?.data?.checkSession.user;

    if (
      !user ||
      (checkSessionResponse?.errors && checkSessionResponse?.errors.length > 0)
    ) {
      // No session and no redirect.
      if (options?.redirect === false) {
        return {
          props: {
            initialApolloState,
          },
        };
      }
      // Redirect to login page
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
        props: {
          initialApolloState,
          user: null,
        },
      };
    }

    const refreshToken = checkSessionResponse?.data?.checkSession.refreshToken;
    context.res.setHeader(
      'Set-Cookie',
      serialize(SUPABASE_REFRESH_TOKEN_COOKIE_KEY_WITH_lS, refreshToken, {
        path: '/',
        sameSite: 'strict',
      })
    );

    // Prevent logged in users from accessing login/signup pages
    if (pageType === PageType.LOGIN || pageType === PageType.SIGNUP) {
      return {
        redirect: {
          destination: user.role === UserRole.USER ? '/user' : '/admin',
          permanent: false,
        },
        props: {
          initialApolloState,
          user,
        },
      };
    }

    // If user is logged in, redirect to user page
    if (user.role === UserRole.USER) {
      if (pageType === PageType.USER) {
        return {
          props: {
            initialApolloState,
            user,
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
          user,
        },
      };
    }

    // If admin is already logged in, redirect to /admin
    if (user.role === UserRole.ADMIN) {
      if (ADMIN_PAGES.includes(pageType)) {
        return {
          props: {
            initialApolloState,
            user,
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
          user,
        },
      };
    }
    return {
      props: {
        initialApolloState,
        user,
      },
    };
  };
export const withLogout =
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

    const logoutRes = await apolloClient
      .mutate<LogoutMutation>({
        mutation: LogoutDocument,
      })
      .catch(() => {
        // no op
      });

    context.res.setHeader(
      'Set-Cookie',
      serialize(SUPABASE_REFRESH_TOKEN_COOKIE_KEY_WITH_lS, '', {
        path: '/',
        sameSite: 'strict',
      })
    );

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props: {
        initialApolloState,
        user: null,
      },
    };
  };
