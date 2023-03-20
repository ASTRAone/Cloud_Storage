import React, { useEffect } from "react";
import { useStyles } from "../../hooks/useStyles";
import Logo from "../../assets/images/cloud-logo.png";

import { getUserData, userAuth, userLogout } from "../../store/auth/data";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { StorageService } from "../../services/StorageService";

import { AUTH_HEADER } from "../../utility/headers";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utility/contants";

import { useAuth } from "../../hooks/useAuth";

import { ButtonLink } from "../ButtonLink";
import { Button } from "../Button";

import styles from "./styles.module.scss";

const storageService = StorageService.getInstance();

export const NavBar: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getUserData);

  useAuth();
  useEffect(() => {
    dispatch(userAuth()).unwrap();
  }, []);

  const logout = async () => {
    try {
      storageService.removeItem(AUTH_HEADER);
      await dispatch(userLogout()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("navBar")}>
      <div className={cx("containerLogo")}>
        <img src={Logo} alt="" className={cx("img")} />
        <div className={cx("logo__title")}>mern cloud</div>
      </div>
      <div className={cx("btns")}>
        {!user?.isAuth && (
          <ButtonLink className={cx("login")} to={LOGIN_ROUTE} text="Войти" />
        )}
        {!user?.isAuth && (
          <ButtonLink
            className={cx("registration")}
            to={REGISTRATION_ROUTE}
            text="Регистрация"
          />
        )}
        {user?.isAuth && <Button text="Выйти" onClick={logout} />}
      </div>
    </div>
  );
};
