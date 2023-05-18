import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

export const SkeletonLoadingFiles: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <div className={cx('skeleton')}>
      <Skeleton
        width="100%"
        height={73}
      />
      <Skeleton
        width="100%"
        height={73}
      />
      <Skeleton
        width="100%"
        height={73}
      />
      <Skeleton
        width="100%"
        height={73}
      />
      <Skeleton
        width="100%"
        height={73}
      />
      <Skeleton
        width="100%"
        height={73}
      />
      <Skeleton
        width="100%"
        height={73}
      />
      <Skeleton
        width="100%"
        height={73}
      />
    </div>
  );
};
