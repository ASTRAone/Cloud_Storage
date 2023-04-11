import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Disk } from '@components/Disk';

// import { DrageComponent } from '@components/DrageComponent';

import styles from './styles.module.scss';

export const Files: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <div className={cx('page')}>
      {/* <DrageComponent /> */}
      <Disk />
    </div>
  );
};
