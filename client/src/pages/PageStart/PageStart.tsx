import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

// TODO доделать
export const PageStart: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <div className={cx('page')}>
      <div className={cx('header')}>
        <div className={cx('header-left')} />
      </div>
    </div>
  );
};
