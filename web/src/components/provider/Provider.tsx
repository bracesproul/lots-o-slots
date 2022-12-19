import React, { ReactElement, ReactNode } from 'react';
import { SSRProvider as ReactAriaProvider } from '@react-aria/ssr';

export type ProviderProps = {
  children?: ReactNode;
};

export default function Provider(props: ProviderProps): ReactElement {
  const { children } = props;
  return <ReactAriaProvider>{children}</ReactAriaProvider>;
}
