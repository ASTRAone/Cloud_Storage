import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { useStyles } from "../../hooks/useStyles";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserData, userLogin } from "../../store/auth/data";

import { Button } from "../Button";
import { ButtonLink } from "../ButtonLink";
import { Input } from "../Input";
import { InputPass } from "../InputPass";
import { ErrorComponent } from "../ErrorComponent";

import { REGEXP_DICTIONARY } from "../../utility/regexp";
import { AuthDTO } from "../../api/AuthApi/models";

import { RestService } from "../../services/RestService";
import { StorageService } from "../../services/StorageService";

import { AUTH_HEADER } from "../../utility/headers";
import { REGISTRATION_ROUTE } from "../../utility/contants";

import styles from "./styles.module.scss";

const restService = RestService.getInstance();
const storageService = StorageService.getInstance();

export const Auth: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const [errorRes, setErrorRes] = useState(false);
  const { status } = useAppSelector(getUserData);
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

  const loginUser = async (data: unknown) => {
    try {
      const { token } = await dispatch(userLogin(data as AuthDTO)).unwrap();
      restService.addDefaultHeader(AUTH_HEADER, `Bearer ${token}`);
      storageService.setItem(AUTH_HEADER, `Bearer ${token}`);
    } catch (error) {
      setErrorRes(true);
      console.log(error);
    }
  };

  return (
    <div className={cx("container")}>
      <h2 className={cx("title")}>Авторизация</h2>
      <div className={cx("content")}>
        <Controller
          control={control}
          rules={{ required: true, pattern: REGEXP_DICTIONARY.email }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              isBorder
              placeholder="Введите адрес электронной почты..."
              error={errors.email || errorRes}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{ required: true, minLength: 3 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputPass
              onChange={onChange}
              value={value}
              isBorder
              placeholder="Введите пароль..."
              error={errors.password || errorRes}
            />
          )}
          name="password"
        />
      </div>
      {errorRes && <ErrorComponent text="Неверный логин или пароль" />}
      <div className={cx("footer")}>
        <ButtonLink to={REGISTRATION_ROUTE} text="Нет аккаунта?" />
        <Button
          onClick={handleSubmit(loginUser)}
          isLoading={status === "loading"}
          text="Войти"
        />
      </div>
    </div>
  );
};

export type { PropsLoginUser };
