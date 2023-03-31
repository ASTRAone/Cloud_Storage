import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { ItemMenu } from '@components/ItemMenu';

import styles from './styles.module.scss';

type Props = {
  auth?: boolean;
};

export const DropDownMenu: React.FC<Props> = () => {
  const cx = useStyles(styles);
  // const { t } = useTranslation();
  return (
    <div className={cx('container')}>
      <div className={cx('dropdown-content')}>
        <div className={cx('item')}>
          <ItemMenu
            iconType="user"
            to="/account"
            linkName="Edit"
            classNameIcon={cx('icon')}
            classNameLink={cx('btn-link')}
          />
        </div>
        <div className={cx('item')}>
          <ItemMenu
            iconType="disk"
            to="/mydisk"
            linkName="My Disk"
            classNameIcon={cx('icon')}
            classNameLink={cx('btn-link')}
          />
        </div>
        <div className={cx('item')}>
          <ItemMenu
            iconType="settings"
            to="/settings"
            linkName="Settings"
            classNameIcon={cx('icon')}
            classNameLink={cx('btn-link')}
          />
        </div>
        <hr />
        <div className={cx('item')}>
          <ItemMenu
            iconType="logout"
            to="/logout"
            linkName="LogOut"
            classNameIcon={cx('icon')}
            classNameLink={cx('btn-link', 'no-border-hover')}
          />
        </div>
      </div>
    </div>
  );
};
