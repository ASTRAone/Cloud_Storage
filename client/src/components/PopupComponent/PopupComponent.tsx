import React from "react";
import { useStyles } from "../../hooks/useStyles";
import { Button } from "../Button";
import { ErrorComponent } from "../ErrorComponent";
import { Icon } from "../icon";
import { Input } from "../Input";

import styles from "./styles.module.scss";

type Props = {
  open?: boolean;
  close?: () => void;
  submit?: () => void;
  loading?: boolean;
  error?: boolean;
  children?: any;
  title?: string;
  textBtn?: string;
};

export const PopupComponent: React.FC<Props> = ({
  open = false,
  close = () => {},
  submit = () => {},
  loading = false,
  error = false,
  title = "",
  textBtn = "Создать",
  children,
}) => {
  const cx = useStyles(styles);

  return open ? (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("header")}>
          <div className={cx("title")}>{title}</div>
          <Icon onClick={close} className={cx("icon")} type="close" />
        </div>
        {children}
        {error && (
          <ErrorComponent
            className={cx("error")}
            text="Ошибка создания файла"
          />
        )}
        <Button
          className={cx("btn")}
          isLoading={loading}
          text={textBtn}
          onClick={submit}
        />
      </div>
    </div>
  ) : null;
};
