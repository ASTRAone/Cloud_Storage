import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  useAppDispatch,
  useSelector,
} from "../../redux/store/configurationStore";
import { login } from "../../redux/actions/user.action";

import { useStyles } from "../../hooks/useStyles";

import { REGISTRATION_ROUTE } from "../../utility/contants";
import { Button } from "../Button";
import { ButtonLink } from "../ButtonLink";
import { Input } from "../Input";
import { InputPass } from "../InputPass";

import styles from "./styles.module.scss";
import { ErrorComponent } from "../ErrorComponent";
import { setAccessToken } from "../../utility/customAxios";
import { REGEXP_DICTIONARY } from "../../utility/regexp";
import { userLogin } from "../../store/auth/data";
import { AuthDTO } from "../../api/AuthApi/models";

type PropsLoginUser = {
  email: string;
  password: string;
};

export const Auth: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const [errorRes, setErrorRes] = useState(false);
  const { loading } = useSelector((store) => store.user);
  const {
    control,
    handleSubmit,
    reset,
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
      setErrorRes(false);
      await dispatch(userLogin(data as AuthDTO)).unwrap();
      // if (res?.response?.status === 400) {
      //   setErrorRes(true)
      //   return;
      // // }
      // setAccessToken(res.token);
      // localStorage.setItem('token', res.token)
      reset();
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
          isLoading={loading}
          text="Войти"
        />
      </div>
    </div>
  );
};

export type { PropsLoginUser };
