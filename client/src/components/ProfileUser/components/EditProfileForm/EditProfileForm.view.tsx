import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useStyles } from '@hooks/useStyles';

import { Input } from '@components/Input';
import { Textarea } from '@components/Textarea';
import { Button } from '@components/Button';

import styles from './styles.module.scss';

type Props = {
  btnDisabled: boolean;
  isLoading: boolean;
};

const EditProfileFormComponentView: React.FC<Props> = ({ btnDisabled, isLoading }) => {
  const cx = useStyles(styles);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={cx('container')}>
      <div className={cx('input-block')}>
        <Controller
          control={control}
          rules={{ required: true, minLength: 2 }}
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              full
              isUpperCase={false}
              placeholder="First name"
              error={errors.name}
              label="First name"
              variant="blue"
              classNameLabel={cx('label')}
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{ required: true, minLength: 2 }}
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              full
              isUpperCase={false}
              placeholder="Last name"
              error={errors.lastname}
              label="Last name"
              variant="blue"
              classNameLabel={cx('label')}
            />
          )}
          name="surname"
        />
      </div>

      <div className={cx('input-block')}>
        <Controller
          control={control}
          rules={{ minLength: 2 }}
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              full
              isUpperCase={false}
              placeholder="Phone number"
              error={errors.phone}
              label="Phone number"
              variant="blue"
              classNameLabel={cx('label')}
            />
          )}
          name="phone"
        />

        <Controller
          control={control}
          rules={{ minLength: 2 }}
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              full
              isUpperCase={false}
              placeholder="Email address"
              error={errors.email}
              label="Email address"
              variant="blue"
              classNameLabel={cx('label')}
            />
          )}
          name="email"
        />
      </div>

      <div className={cx('input-block')}>
        <Controller
          control={control}
          rules={{ minLength: 2 }}
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              full
              isUpperCase={false}
              placeholder="Country"
              error={errors.country}
              label="Country"
              variant="blue"
              classNameLabel={cx('label')}
            />
          )}
          name="country"
        />

        <Controller
          control={control}
          rules={{ minLength: 2 }}
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              full
              isUpperCase={false}
              placeholder="City"
              error={errors.city}
              label="City"
              variant="blue"
              classNameLabel={cx('label')}
            />
          )}
          name="city"
        />
      </div>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Textarea
            onChange={onChange}
            value={value}
            label="bio"
            variant="blue"
            error={errors.bio}
            placeholder="Bio"
            classNameLabel={cx('textarea')}
          />
        )}
        name="biography"
      />

      <Button
        text="update"
        type="submit"
        color="light-blue"
        classNameContainer={cx('btn')}
        disabled={btnDisabled}
        isLoading={isLoading}
      />
    </div>
  );
};

const EditProfileFormView = React.memo(EditProfileFormComponentView);

export { EditProfileFormView };
