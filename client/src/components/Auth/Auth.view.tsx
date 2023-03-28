import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { REGISTRATION_ROUTE } from '@utils/contants';
import { REGEXP_DICTIONARY } from '@utils/regexp';

import { useStyles } from '@hooks/useStyles';

import { InputPass } from '@components/InputPass';
import { ErrorComponent } from '@components/ErrorComponent';
import { Input } from '@components/Input';
import { ButtonLink } from '@components/ButtonLink';
import { Button } from '@components/Button';
import { Icon } from '@components/icon';

import styles from './styles.module.scss';

type Props = {
  loading: boolean;
  isError: boolean;
  setError: (value: boolean) => void;
};

export const AuthView: React.FC<Props> = ({ loading, isError, setError }) => {
  const cx = useStyles(styles);
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const [email, pass] = watch(['email', 'password']);

  useEffect(() => {
    if (isError) {
      setError(false);
    }
  }, [email, pass]);

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
              error={errors.email || isError}
              label="name"
              actions={[
                {
                  icon: (
                    <Icon
                      type="user"
                      className={cx('icon')}
                    />
                  ),
                  align: 'left',
                },
              ]}
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
              error={errors.password || isError}
            />
          )}
          name="password"
        />
      </div>
      {isError && <ErrorComponent text="Неверный логин или пароль" />}
      <div className={cx('footer')}>
        <ButtonLink
          to={REGISTRATION_ROUTE}
          text="Нет аккаунта?"
        />
        <Button
          // type="submit"
          isLoading={loading}
          text="sing up"
        />
      </div>
    </div>
  );
};
