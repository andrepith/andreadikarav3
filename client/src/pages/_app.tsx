import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "src/store/actions/auth";
import setAuthToken from "src/utils/setAuthToken";
import { AUTH_ERROR } from "src/store/types";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (typeof window !== "undefined" && localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    // @ts-ignore
    store.dispatch({ type: AUTH_ERROR });
  }
  useEffect(() => {
    // @ts-ignore
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Head>
        <title>Andre Adikara | Front-End Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Personal Website of Andre Adikara"
        ></meta>
      </Head>
      <Script src="https://kit.fontawesome.com/7493c7897f.js" />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;
