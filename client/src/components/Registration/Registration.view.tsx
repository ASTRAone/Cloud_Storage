import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { REGEXP_DICTIONARY } from '@utils/regexp';
import { LOGIN_ROUTE } from '@utils/contants';

import { useStyles } from '@hooks/useStyles';

import { Input } from '@components/Input';
import { InputPass } from '@components/InputPass';
import { ErrorComponent } from '@components/ErrorComponent';
import { Button } from '@components/Button';
import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';

import styles from './styles.module.scss';

type Props = {
  loading: boolean;
  isError: boolean;
  setError: (value: boolean) => void;
};

export const RegistrationView: React.FC<Props> = ({ loading, isError, setError }) => {
  const cx = useStyles(styles);
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation();

  const [name, surname, email, pass] = watch(['name', 'surname', 'email', 'password']);

  useEffect(() => {
    if (isError) {
      setError(false);
    }
  }, [name, surname, email, pass]);

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>{t('registration.title.main')}</p>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            label={t('registration.labels.name')}
            full
            placeholder={t('registration.placeholder.name')}
            error={errors.name || isError}
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
        name="name"
      />

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            label={t('registration.labels.surname')}
            full
            placeholder={t('registration.placeholder.surname')}
            error={errors.surname || isError}
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
        name="surname"
      />

      <Controller
        control={control}
        rules={{ required: true, pattern: REGEXP_DICTIONARY.email }}
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            full
            label={t('registration.labels.email')}
            placeholder={t('registration.placeholder.email')}
            error={errors.email || isError}
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
            full
            label={t('registration.labels.password')}
            placeholder={t('registration.placeholder.password')}
            error={errors.password || isError}
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
          />
        )}
        name="password"
      />
      {isError && <ErrorComponent text="Registration error" />}
      <Button
        type="submit"
        isUpperCase
        className={cx('btn')}
        isLoading={loading}
        text={t('registration.button.register')}
      />
      <ButtonLink
        text={t('registration.title.accountQuestion')}
        to={LOGIN_ROUTE}
        className={cx('btn-link')}
      />
    </div>
  );
};
