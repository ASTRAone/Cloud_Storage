import React from "react";
import { useForm } from "react-hook-form";
import { useStyles } from "../../hooks/useStyles";

import { Button } from "../Button";
import { Input } from "../Input";
import { InputPass } from "../InputPass";

import styles from "./styles.module.scss";

export const Registration: React.FC = () => {
  const cx = useStyles(styles);

  return (
    <div className={cx("container")}>
      <h2 className={cx("title")}>Регистрация</h2>
      <div className={cx("content")}>
        <Input placeholder="Введите имя..." />
        <Input placeholder="Введите фамилию..." />
        <Input placeholder="Введите адрес электронной почты..." />
        <InputPass placeholder="Введите пароль..." />
      </div>
      <div className={cx("footer")}>
        <Button text="Зарегистрироваться" />
      </div>
    </div>
  );
};

// TODO: сделать компонент ссылку, сделать форму логина