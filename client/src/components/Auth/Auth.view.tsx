import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  useEffect(() => {
    if (isError) {
      setError(false);
    }
  }, [email, pass]);

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>{t('authorization.title.main')}</p>
      <Controller
        control={control}
        rules={{ required: true, pattern: REGEXP_DICTIONARY.email }}
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            full
            placeholder={t('authorization.placeholder.email')}
            error={errors.email || isError}
            label={t('authorization.labels.email')}
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
            label={t('authorization.labels.password')}
            full
            placeholder={t('authorization.placeholder.password')}
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
        text={t('authorization.button.login')}
        type="submit"
        isUpperCase
        isLoading={loading}
        className={cx('btn')}
      />
      <ButtonLink
        text={t('authorization.title.accountQuestion')}
        to={REGISTRATION_ROUTE}
        className={cx('btn-link')}
      />
    </div>
  );
};
