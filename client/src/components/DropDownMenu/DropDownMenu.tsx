import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';

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
        <div className={cx('containerLink')}>
          <Icon
            type="user"
            className={cx('icon')}
          />
          <ButtonLink
            text="Edit"
            to="/account"
            className={cx('btn-link')}
          />
        </div>
        <div className={cx('containerLink')}>
          <Icon
            type="user"
            className={cx('icon')}
          />
          <ButtonLink
            text="My Disk"
            to="/mydisk"
            className={cx('btn-link')}
          />
        </div>
        <div className={cx('containerLink')}>
          <Icon
            type="user"
            className={cx('icon')}
          />
          <ButtonLink
            text="Settings"
            to="/settings"
            className={cx('btn-link')}
          />
        </div>
        <hr />
        <div className={cx('containerLink')}>
          <Icon
            type="user"
            className={cx('icon')}
          />
          <ButtonLink
            text="Log Out"
            to="/logout"
            className={cx('btn-link', 'no-border-hover')}
          />
        </div>
      </div>
    </div>
  );
};
