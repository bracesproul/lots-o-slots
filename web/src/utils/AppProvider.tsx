import React, { ReactElement, useState } from 'react';
import { NormalizedCacheObject, ApolloProvider } from '@apollo/client';
import { Provider as ComponentProvider } from '@/components';
import { SSRProvider } from '@/providers';
import { useApollo } from './apollo';
import { ProviderType, withProviders } from './withProviders';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';

type AppProviderProps = {
  children: React.ReactNode;
  initialApolloState?: NormalizedCacheObject | null;
  ssrIsMobile?: boolean;
  initialSession?: Session;
};
const AppProvider = ({
  children,
  initialApolloState,
  ssrIsMobile,
  initialSession,
}: AppProviderProps): ReactElement => {
  const client = useApollo(initialApolloState);
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  // Below code is inspired from
  // https://maximzubarev.com/wrap-providers-using-withprovider-hoc

  const providers: ProviderType[] = [
    ComponentProvider,
    [SSRProvider, { isMobile: ssrIsMobile }],
    [ApolloProvider, { client }],
    [
      SessionContextProvider,
      { supabaseClient, initialSession: initialSession },
    ],
  ];

  return withProviders(children, providers);
};

export default AppProvider;
