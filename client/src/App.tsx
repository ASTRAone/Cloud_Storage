import React from "react";
import { Provider } from "react-redux";
import { NavBar } from "./components/NavBar";
import { store } from "./store/root";
import { useStyles } from "./hooks/useStyles";
import { BrowserRouter } from "react-router-dom";

import styles from "./styles.module.scss";
import { AppRouter } from "./components/AppRouter";
import { EnvProvider } from "./EnvProvider/EnvProvider";

export const App: React.FC = () => {
  const cx = useStyles(styles);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <EnvProvider baseURL={process.env.REACT_APP_API_URL}>
          <div className={cx("app")}>
            <NavBar />
            <div className={cx("container")}>
              <AppRouter />
            </div>
          </div>
        </EnvProvider>
      </Provider>
    </BrowserRouter>
  );
};
