import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';

import styles from './styles.module.scss';

// TODO создать тип

export const RecentlyUploadedItem: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <div className={cx('container')}>
      <div className={cx('content-left')}>
        <div className={cx('folder')}>
          <Icon
            type="file"
            className={cx('icon')}
          />
          <p className={cx('text')}>Marcus Family.jpg</p>
        </div>
        <div className={cx('date-our')}>
          <p className={cx('text')}>10 oct</p>
          <p className={cx('text')}>10:23pm</p>
        </div>
      </div>
      <div className={cx('content-right')}>
        <p className={cx('text')}>12</p>
        <p className={cx('text', 'size')}>mb</p>
      </div>
    </div>
  );
};
