import "../styles/globals.css";
//redux
import store from "../redux/store";
import { Provider } from "react-redux";
import { loadUser } from "../redux/actions/auth";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
