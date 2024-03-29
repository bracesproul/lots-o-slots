import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import AppProvider from '../utils/AppProvider';

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactNode {
  return (
    <AppProvider {...pageProps}>
      <Component {...pageProps} />
    </AppProvider>
  );
}
