import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';

import styles from './styles.module.scss';

export const EmptyComponent: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <div className={cx('container')}>
      <h3 className={cx('title')}>Now there are no your favorite folders</h3>
      <p className={cx('text')}>You have to mark some folders as favorites</p>
      <div className={cx('container-icon')}>
        <Icon
          type="empty"
          className={cx('icon')}
        />
      </div>
    </div>
  );
};
