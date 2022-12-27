import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { Provider } from 'react-redux';
import { store } from '../app/redux/store';
import { CookiesProvider } from 'react-cookie';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
}
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {

  const getLayout = Component.getLayout ?? ((page: any) => page);
  return <CookiesProvider>
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  </CookiesProvider>

}

export default App;