import React, { ReactElement } from 'react';
import { NormalizedCacheObject, ApolloProvider } from '@apollo/client';
import { Provider as ComponentProvider } from '@/components';
import { SSRProvider } from '@/providers';
import { useApollo } from './apollo';
import { ProviderType, withProviders } from './withProviders';

type AppProviderProps = {
  children: React.ReactNode;
  initialApolloState?: NormalizedCacheObject | null;
  ssrIsMobile?: boolean;
};
const AppProvider = ({
  children,
  initialApolloState,
  ssrIsMobile,
}: AppProviderProps): ReactElement => {
  const client = useApollo(initialApolloState);

  // Below code is inspired from
  // https://maximzubarev.com/wrap-providers-using-withprovider-hoc

  const providers: ProviderType[] = [
    ComponentProvider,
    [SSRProvider, { isMobile: ssrIsMobile }],
    [ApolloProvider, { client }],
  ];

  return withProviders(children, providers);
};

export default AppProvider;
