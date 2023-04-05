import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useStyles } from '@hooks/useStyles';

import { Button } from '@components/Button';
import { SwitchComponent } from '@components/SwitchComponent';

import styles from './styles.module.scss';

export const SettingsProfileUserView: React.FC = () => {
  const cx = useStyles(styles);
  const { control } = useFormContext();

  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <div className={cx('checkbox-block')}>
          <p className={cx('text')}>Allow notifications</p>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SwitchComponent
                onChange={onChange}
                value={value}
              />
            )}
            name="notifications"
          />
        </div>

        <div className={cx('checkbox-block')}>
          <p className={cx('text')}>Allow automatically change language</p>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SwitchComponent
                onChange={onChange}
                value={value}
              />
            )}
            name="language"
          />
        </div>

        <div className={cx('checkbox-block')}>
          <p className={cx('text')}>Hide status online</p>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SwitchComponent
                onChange={onChange}
                value={value}
              />
            )}
            name="status"
          />
        </div>

        <div className={cx('checkbox-block')}>
          <p className={cx('text')}>Order whores</p>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SwitchComponent
                onChange={onChange}
                value={value}
              />
            )}
            name="order"
          />
        </div>
      </div>
      <Button
        type="submit"
        text="update"
        color="light-blue"
        className={cx('btn')}
      />
    </div>
  );
};
