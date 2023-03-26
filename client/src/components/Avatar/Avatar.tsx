import React, { ChangeEvent, MutableRefObject, useEffect, useRef } from "react";
import { useStyles } from "../../hooks/useStyles";
import AvatarDefault from "../../assets/images/user-avatar.png";

import styles from "./styles.module.scss";
import { usePopupControls } from "../../hooks/usePopupControls";
import { Button } from "../Button";
import { AUTH_HEADER } from "../../utility/headers";
import { userLogout } from "../../store/auth/data";
import { useAppDispatch } from "../../store/hooks";

type Props = {
  src?: string;
  fullName: string;
};

export const Avatar: React.FC<Props> = ({ src }) => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { isOpened, openPopup, closePopup } = usePopupControls();

  const handleOpenPopup = (e: any) => {
    e.stopPropagation();
    openPopup();
  };
  const handleClosePopup = (e: any) => {
    e.stopPropagation();
    closePopup();
  };

  const logout = async (e: any) => {
    e.stopPropagation();
    try {
      localStorage.removeItem(AUTH_HEADER);
      await dispatch(userLogout()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cx("container")}
      onClick={(e) => handleOpenPopup(e)}
    >
      <div className={cx("content")}>
        <img
          src={src ? src : AvatarDefault}
          alt="avatar"
          className={cx("avatar")}
        />
        <p className={cx("name")}>Смирнов В.В.</p>
      </div>
      {isOpened && (
        <div className={cx("menu")}>
          <Button text="Выйти" onClick={(e) => logout(e)} />
        </div>
      )}
    </div>
  );
};
