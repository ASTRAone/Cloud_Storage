import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

export const EditProfileFormSkeleton: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <div className={cx('skeleton')}>
      <div className={cx('skeleton-block')}>
        <div className={cx('skeleton-item')}>
          <Skeleton
            height={23}
            width={100}
          />
          <Skeleton
            height={37}
            width="100%"
          />
        </div>
        <div className={cx('skeleton-item')}>
          <Skeleton
            height={23}
            width={100}
          />
          <Skeleton
            height={37}
            width="100%"
          />
        </div>
      </div>

      <div className={cx('skeleton-block')}>
        <div className={cx('skeleton-item')}>
          <Skeleton
            height={23}
            width={100}
          />
          <Skeleton
            height={37}
            width="100%"
          />
        </div>
        <div className={cx('skeleton-item')}>
          <Skeleton
            height={23}
            width={100}
          />
          <Skeleton
            height={37}
            width="100%"
          />
        </div>
      </div>

      <div className={cx('skeleton-block')}>
        <div className={cx('skeleton-item')}>
          <Skeleton
            height={23}
            width={100}
          />
          <Skeleton
            height={37}
            width="100%"
          />
        </div>
        <div className={cx('skeleton-item')}>
          <Skeleton
            height={23}
            width={100}
          />
          <Skeleton
            height={37}
            width="100%"
          />
        </div>
      </div>
      <div className={cx('skeleton-block')}>
        <div className={cx('skeleton-item')}>
          <Skeleton
            height={23}
            width={100}
          />
          <Skeleton
            height={105}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};
