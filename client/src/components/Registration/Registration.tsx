import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStyles } from "../../hooks/useStyles";
import { useNavigate } from "react-router-dom";

import { Button } from "../Button";
import { ButtonLink } from "../ButtonLink";
import { Input } from "../Input";
import { InputPass } from "../InputPass";
import { ErrorComponent } from "../ErrorComponent";

import { LOGIN_ROUTE } from "../../utility/contants";
import { REGEXP_DICTIONARY } from "../../utility/regexp";

import { getUserData, userRegistration } from "../../store/auth/data";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { AuthRegDTO } from "../../api/AuthApi/models";

import styles from "./styles.module.scss";

export const Registration: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { statusReg } = useAppSelector(getUserData);
  const [errorRes, setErrorRes] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [email, pass] = watch(["email", "password"]);

  useEffect(() => {
    if (errorRes) {
      setErrorRes(false);
    }
  }, [email, pass]);

  const createUser = async (data: unknown) => {
    try {
      await dispatch(userRegistration(data as AuthRegDTO)).unwrap();
      navigate(LOGIN_ROUTE);
    } catch (error) {
      setErrorRes(true);
      console.log(error);
    }
  };

  return (
    <div className={cx("container")}>
      <h2 className={cx("title")}>Регистрация</h2>
      <div className={cx("content")}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              isBorder
              placeholder="Введите имя..."
              error={errors.name}
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              isBorder
              placeholder="Введите фамилию..."
              error={errors.surname}
            />
          )}
          name="surname"
        />

        <Controller
          control={control}
          rules={{ required: true, pattern: REGEXP_DICTIONARY.email }}
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              isBorder
              placeholder="Введите адрес электронной почты..."
              error={errors.email}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{ required: true, minLength: 3 }}
          render={({ field: { onChange, value } }) => (
            <InputPass
              onChange={onChange}
              value={value}
              isBorder
              placeholder="Введите пароль..."
              error={errors.password}
            />
          )}
          name="password"
        />
      </div>
      {errorRes && (
        <ErrorComponent text="Пользователь с таким email уже зарегистрирован" />
      )}
      <div className={cx("footer")}>
        <ButtonLink to={LOGIN_ROUTE} text="Есть аккаунт?" />
        <Button
          onClick={handleSubmit(createUser)}
          isLoading={statusReg === "loading"}
          text="Зарегистрироваться"
        />
      </div>
    </div>
  );
};
