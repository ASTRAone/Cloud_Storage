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
  isDisabled: boolean;
  setError: (value: boolean) => void;
};

export const RegistrationView: React.FC<Props> = ({ loading, isError, isDisabled, setError }) => {
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
      <p className={cx('title')}>{t('authorization.title.register')}</p>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            label={t('authorization.labels.name')}
            full
            placeholder={t('authorization.placeholder.name')}
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
            label={t('authorization.labels.surname')}
            full
            placeholder={t('authorization.placeholder.surname')}
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
            label={t('authorization.labels.email')}
            placeholder={t('authorization.placeholder.email')}
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
            label={t('authorization.labels.password')}
            placeholder={t('authorization.placeholder.password')}
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
      {isError && <ErrorComponent text="authorization error" />}
      <Button
        type="submit"
        isUpperCase
        className={cx('btn')}
        isLoading={loading}
        disabled={isDisabled}
        text={t('authorization.button.register')}
      />
      <ButtonLink
        text={t('authorization.title.accountQuestion')}
        to={LOGIN_ROUTE}
        className={cx('btn-link')}
      />
    </div>
  );
};
