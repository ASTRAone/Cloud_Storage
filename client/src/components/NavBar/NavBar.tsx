import React from "react";
import { useStyles } from "../../hooks/useStyles";
import Logo from "../../assets/images/cloud-logo.png";

import styles from "./styles.module.scss";

export const NavBar: React.FC = () => {
  const cx = useStyles(styles);

  return (
    <div className={cx("navBar")}>
      <div className={cx("containerLogo")}>
        <img src={Logo} alt="" className={cx("img")} />
        <div className={cx("logo__title")}>mern cloud</div>
      </div>
      <div className={cx("btns")}>
        <div className="login">Войти</div>
        <div className="registration">Регистрация</div>
      </div>
    </div>
  );
};
