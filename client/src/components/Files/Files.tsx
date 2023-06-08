import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Disk } from '@components/Disk';
// import { FoldersBrightRaw } from '@components/FoldersBrightRaw';

import styles from './styles.module.scss';

export const Files: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <div className={cx('page')}>
      {/* <div className={cx('header')}>
        <h3 className={cx('title')}>Quick Access</h3>
      </div>
      <FoldersBrightRaw /> */}
      <Disk />
    </div>
  );
};
