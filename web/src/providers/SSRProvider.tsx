import React, { ReactElement } from 'react';
import isServer from '@/utils/isServer';
import { createContext } from 'react';

const SSRContext = createContext({
  isMobile: false,
  isServer: false,
});

export type ContextValue = {
  isMobile: boolean;
  isServer: boolean;
};

export default function SSRProvider({
  children,
  isMobile,
}: {
  children: ReactElement;
  isMobile?: boolean;
}): ReactElement {
  return (
    <SSRContext.Provider value={{ isMobile: !!isMobile, isServer: isServer() }}>
      {children}
    </SSRContext.Provider>
  );
}
