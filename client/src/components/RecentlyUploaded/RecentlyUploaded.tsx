import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';
import { RecentlyUploadedItem } from './components/RecentlyUploadedItem';

export const RecentlyUploaded: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <div className={cx('container')}>
      <p className={cx('title')}>Recently Uploaded</p>
      <div className={cx('content')}>
        <RecentlyUploadedItem />
        <RecentlyUploadedItem />
        <RecentlyUploadedItem />
        <RecentlyUploadedItem />
      </div>
    </div>
  );
};
