import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { REGEXP_DICTIONARY } from '@utils/regexp';
import { REGISTRATION_ROUTE } from '@utils/contants';

import { useStyles } from '@hooks/useStyles';

import { InputPass } from '@components/InputPass';
import { ErrorComponent } from '@components/ErrorComponent';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';

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
      <p className={cx('title')}>sign in</p>
      <Controller
        control={control}
        rules={{ required: true, pattern: REGEXP_DICTIONARY.email }}
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            full
            placeholder="Enter your email"
            error={errors.email || isError}
            label="email"
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
            label="password"
            full
            placeholder="Enter password"
            actions={[
              {
                icon: (
                  <Icon
                    type="security"
                    className={cx('icon')}
                  />
                ),
                align: 'left',
              },
            ]}
            error={errors.password || isError}
          />
        )}
        name="password"
      />
      {isError && <ErrorComponent text="Authorisation error" />}
      <Button
        text="sign in"
        type="submit"
        isLoading={loading}
        className={cx('btn')}
      />
      <ButtonLink
        text="Don’t have an account?"
        to={REGISTRATION_ROUTE}
        className={cx('btn-link')}
      />
    </div>
  );
};
