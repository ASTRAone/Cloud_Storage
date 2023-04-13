import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

export const RecentlySkeleton: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <div className={cx('skeleton')}>
      <div className={cx('skeleton-container')}>
        <Skeleton
          width="100%"
          height={22}
        />
        <Skeleton
          width="80%"
          height={22}
        />
      </div>
      <div className={cx('skeleton-container')}>
        <Skeleton
          width="100%"
          height={22}
        />
        <Skeleton
          width="80%"
          height={22}
        />
      </div>
      <div className={cx('skeleton-container')}>
        <Skeleton
          width="100%"
          height={22}
        />
        <Skeleton
          width="80%"
          height={22}
        />
      </div>
      <div className={cx('skeleton-container')}>
        <Skeleton
          width="100%"
          height={22}
        />
        <Skeleton
          width="80%"
          height={22}
        />
      </div>
    </div>
  );
};
