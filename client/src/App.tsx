import React from "react";
import { Provider } from "react-redux";
import { NavBar } from "./components/NavBar";
import store from "./redux/store/configurationStore";
import { useStyles } from "./hooks/useStyles";
import { BrowserRouter } from "react-router-dom";

import styles from "./styles.module.scss";
import { AppRouter } from "./components/AppRouter";

export const App: React.FC = () => {
  const cx = useStyles(styles);


  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={cx("app")}>
          <NavBar />
          <div className={cx("container")}>
            <AppRouter />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
};
