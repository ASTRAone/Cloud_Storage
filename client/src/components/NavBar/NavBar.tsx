import React, { useEffect } from "react";
import { useStyles } from "../../hooks/useStyles";
import Logo from "../../assets/images/cloud-logo.png";
import {
  useAppDispatch,
  useSelector,
} from "../../redux/store/configurationStore";

import styles from "./styles.module.scss";
import { ButtonLink } from "../ButtonLink";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utility/contants";
import { Button } from "../Button";
import { dropState } from "../../redux/reducers/user.reducer";

export const NavBar: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { isAuth } = useSelector((store) => store.user);

  const outUser = async () => {
    await dispatch(dropState());
  };

  return (
    <div className={cx("navBar")}>
      <div className={cx("containerLogo")}>
        <img src={Logo} alt="" className={cx("img")} />
        <div className={cx("logo__title")}>mern cloud</div>
      </div>
      <div className={cx("btns")}>
        {!isAuth && (
          <ButtonLink className={cx("login")} to={LOGIN_ROUTE} text="Войти" />
        )}
        {!isAuth && (
          <ButtonLink
            className={cx("registration")}
            to={REGISTRATION_ROUTE}
            text="Регистрация"
          />
        )}
        {isAuth && <Button text="Выйти" onClick={outUser} />}
      </div>
    </div>
  );
};
