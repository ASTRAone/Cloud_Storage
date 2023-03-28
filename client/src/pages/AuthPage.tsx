import React from 'react';

import { LayoutAuth } from '@src/layout/LayoutAuth';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

export const AuthPage: React.FC = () => {
  const cx = useStyles(styles);
  // const location = useLocation();
  return (
    <div className={cx('wrapper')}>
      <div>1</div>
      <div className={cx('content')}>
        <LayoutAuth />
      </div>
      <div className={cx('footer')}>1</div>
    </div>
  );
};
