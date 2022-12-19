import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import isServer from '../isServer';
import { merge } from 'lodash';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
function createApolloClient() {
  const API_URL = process.env.APOLLO_SERVER_URI;
  if (!API_URL) {
    throw new Error('SERVER URI NOT FOUND.');
  }
  return new ApolloClient({
    uri: `${API_URL}/api`,
    cache: new InMemoryCache(),
    ssrMode: isServer(),
    connectToDevTools: !isServer(),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
): ApolloClient<NormalizedCacheObject> {
  // For SSG and SSR always create a new Apollo Client
  const _apolloClient =
    !apolloClient || isServer() ? createApolloClient() : apolloClient;

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
