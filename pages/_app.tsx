import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { StoreProvider, useStoreRehydrated } from 'easy-peasy';
import store from '@/store';
const inter = Inter({ subsets: ['latin'] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

function WaitForStateRehydration({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : <div>loading</div>;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page);
  return getLayout(
    <StoreProvider store={store}>
      <ThemeProvider attribute="class">
        <WaitForStateRehydration>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </WaitForStateRehydration>
      </ThemeProvider>
    </StoreProvider>,
  );
}

