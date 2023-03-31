import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { DrageComponent } from '@components/DrageComponent';

import styles from './styles.module.scss';

export const Cloud: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <div className={cx('page')}>
      <DrageComponent />
    </div>
  );
};
