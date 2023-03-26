import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getUserData, userLogin } from '@store/auth/data';

import { REGEXP_DICTIONARY } from '@src/utility/regexp';
import { AUTH_HEADER } from '@src/utility/headers';
import { REGISTRATION_ROUTE } from '@src/utility/contants';

import { AuthDTO } from '@api/AuthApi/models';

import { useStyles } from '@hooks/useStyles';

import { Button } from '@components/Button';
import { ButtonLink } from '@components/ButtonLink';
import { Input } from '@components/Input';
import { InputPass } from '@components/InputPass';
import { ErrorComponent } from '@components/ErrorComponent';

import styles from './styles.module.scss';

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
  const [email, pass] = watch(['email', 'password']);

  useEffect(() => {
    if (errorRes) {
      setErrorRes(false);
    }
  }, [email, pass]);

  const loginUser = async (data: unknown) => {
    try {
      const { accessToken } = await dispatch(userLogin(data as AuthDTO)).unwrap();
      localStorage.setItem(AUTH_HEADER, `Bearer ${accessToken}`);
    } catch (error) {
      setErrorRes(true);
      console.log(error);
    }
  };

  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>Авторизация</h2>
      <div className={cx('content')}>
        <Controller
          control={control}
          rules={{ required: true, pattern: REGEXP_DICTIONARY.email }}
          render={({ field: { onChange, value } }) => (
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
          render={({ field: { onChange, value } }) => (
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
      <div className={cx('footer')}>
        <ButtonLink
          to={REGISTRATION_ROUTE}
          text="Нет аккаунта?"
        />
        <Button
          onClick={handleSubmit(loginUser)}
          isLoading={status === 'loading'}
          text="Войти"
        />
      </div>
    </div>
  );
};
