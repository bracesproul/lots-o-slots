import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client';
import { merge } from 'lodash';
import { useMemo } from 'react';
import { isServer } from '../';
import { setContext } from '@apollo/client/link/context';
import { getAuthHeaders } from '../auth';
import { createUploadLink } from 'apollo-upload-client';

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...getAuthHeaders(),
    },
  };
});

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
export function createApolloClient(headers?: Record<string, unknown>) {
  const link = ApolloLink.from([
    authLink,
    createUploadLink({
      uri:
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/graphql`
          : 'http://localhost:8000/graphql',
      credentials: 'include',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - this has the wrong type
      headers,
    }),
  ]);

  const client = new ApolloClient({
    uri:
      process.env.NODE_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_API_URL}/graphql`
        : 'http://localhost:8000/graphql',
    cache: new InMemoryCache(),
    ssrMode: isServer(),
    connectToDevTools: !isServer(),
    link,
  });
  return client;
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
  headers?: Record<string, unknown>
): ApolloClient<NormalizedCacheObject> {
  // For SSG and SSR always create a new Apollo Client
  const _apolloClient =
    !apolloClient || isServer() ? createApolloClient(headers) : apolloClient;

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data

    _apolloClient.cache.restore(merge({}, existingCache, initialState));
  }
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(
  initialState: NormalizedCacheObject | null = null
): ApolloClient<NormalizedCacheObject> {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
