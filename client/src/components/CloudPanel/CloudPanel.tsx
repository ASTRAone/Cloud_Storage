import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

export const CloudPanel: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <div className={cx('background-wrap')}>
      <div className={cx('x1')}>
        <div className={cx('cloud')} />
      </div>

      <div className={cx('x2')}>
        <div className={cx('cloud')} />
      </div>

      <div className={cx('x3')}>
        <div className={cx('cloud')} />
      </div>

      <div className={cx('x4')}>
        <div className={cx('cloud')} />
      </div>

      <div className={cx('x5')}>
        <div className={cx('cloud')} />
      </div>
    </div>
  );
};
