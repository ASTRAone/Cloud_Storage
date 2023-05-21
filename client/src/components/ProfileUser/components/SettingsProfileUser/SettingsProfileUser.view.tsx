import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { SwitchComponent } from '@components/SwitchComponent';

import styles from './styles.module.scss';

type Props = {
  onChangeHideMenu: (value: boolean) => void;
  hideMenuValue: boolean;
};

export const SettingsProfileUserView: React.FC<Props> = ({ onChangeHideMenu, hideMenuValue }) => {
  const cx = useStyles(styles);

  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <div className={cx('checkbox-block')}>
          <p className={cx('text')}>Allow notifications</p>
          <SwitchComponent
          // onChange={(e) => onChangeHideMenu(e.target.checked)}
          // checked={hideMenuValue}
          />
        </div>

        <div className={cx('checkbox-block')}>
          <p className={cx('text')}>Allow automatically change language</p>
          <SwitchComponent
          // onChange={onChange}
          // value={value}
          />
        </div>

        <div className={cx('checkbox-block')}>
          <p className={cx('text')}>Hide status online</p>
          <SwitchComponent
          // onChange={onChange}
          // value={value}
          />
        </div>

        <div className={cx('checkbox-block')}>
          <p className={cx('text')}>Order whores</p>
          <SwitchComponent
          // onChange={onChange}
          // value={value}
          />
        </div>

        <div className={cx('checkbox-block')}>
          <p className={cx('text')}>Menu hide automatic</p>
          <SwitchComponent
            onChange={(e) => onChangeHideMenu(e.target.checked)}
            checked={hideMenuValue}
          />
        </div>
      </div>
    </div>
  );
};
