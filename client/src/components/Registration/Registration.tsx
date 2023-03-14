import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStyles } from "../../hooks/useStyles";
import { LOGIN_ROUTE } from "../../utility/contants";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../redux/store/configurationStore";
import { registration } from "../../redux/actions/user.action";

import { Button } from "../Button";
import { ButtonLink } from "../ButtonLink";
import { Input } from "../Input";
import { InputPass } from "../InputPass";

import styles from "./styles.module.scss";
import { REGEXP_DICTIONARY } from "../../utility/regexp";
import { ErrorComponent } from "../ErrorComponent";

type PropsCreateUser = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export const Registration: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorRes, setErrorRes] = useState(false);

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

  const createUser = async (data: unknown) => {
    try {
      setErrorRes(false);
      const res = await dispatch(registration(data as PropsCreateUser)).unwrap();
      if (res?.response?.status === 400) {
        setErrorRes(true)
        return;
      }
      reset();
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
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder="Введите имя..."
              error={errors.name}
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder="Введите фамилию..."
              error={errors.surname}
            />
          )}
          name="surname"
        />

        <Controller
          control={control}
          rules={{ required: true, pattern: REGEXP_DICTIONARY.email }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder="Введите адрес электронной почты..."
              error={errors.email}
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
              error={errors.password}
            />
          )}
          name="password"
        />
      </div>
      {errorRes && <ErrorComponent text="Пользователь с таким email уже зарегистрирован" />}
      <div className={cx("footer")}>
        <ButtonLink to={LOGIN_ROUTE} text="Есть аккаунт?" />
        <Button onClick={handleSubmit(createUser)} text="Зарегистрироваться" />
      </div>
    </div>
  );
};

export type { PropsCreateUser };
