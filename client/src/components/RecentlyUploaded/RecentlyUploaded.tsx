import React, { useEffect } from 'react';

import { useStyles } from '@hooks/useStyles';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchRecentlyUploaded, getRecentlyUploaded } from '@store/file/data';

import styles from './styles.module.scss';
import { RecentlyUploadedItem } from './components/RecentlyUploadedItem';
import { RecentlySkeleton } from './components/RecentlySkeleton';

export const RecentlyUploaded: React.FC = () => {
  const cx = useStyles(styles);
  const dispath = useAppDispatch();
  const { dataRecently, statusFetchRecently, needUpdate } = useAppSelector(getRecentlyUploaded);

  useEffect(() => {
    needUpdate && dispath(fetchRecentlyUploaded());
  }, [needUpdate]);

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>Recently Uploaded</p>
      <div className={cx('content')}>
        {statusFetchRecently === 'loading' && <RecentlySkeleton />}
        {dataRecently.length > 0
          ? dataRecently.map((item, index) => (
              <RecentlyUploadedItem
                data={item}
                key={index}
              />
            ))
          : null}
      </div>
    </div>
  );
};
