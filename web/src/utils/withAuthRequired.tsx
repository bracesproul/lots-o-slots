import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { CheckAuthDocument, CheckAuthQuery, useCheckAuthLazyQuery } from '@/generated/graphql';
import { initializeApollo } from './apollo';
import { NormalizedCacheObject } from '@apollo/client';

export const STORAGE_KEY = 'lS_lots_o_slots_auth';

type WithAuthRequiredValue = {
  authed: boolean;
};

type WithAuthResult = GetServerSidePropsResult<{
  initialApolloState: NormalizedCacheObject;
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
      },
    };
  };