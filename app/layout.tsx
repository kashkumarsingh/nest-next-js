import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/store';
import "../public/assets/css/main.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
