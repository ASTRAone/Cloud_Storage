import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { DrageComponent } from '@components/DrageComponent';
import { RecentlyUploaded } from '@components/RecentlyUploaded';
import { SharedFolders } from '@components/SharedFolders';
import { FoldersBrightRaw } from '@components/FoldersBrightRaw';

import styles from './styles.module.scss';

export const Cloud: React.FC = () => {
  const cx = useStyles(styles);

  return (
    <div className={cx('page')}>
      <DrageComponent />
      <FoldersBrightRaw />
      <div className={cx('info-panel')}>
        <RecentlyUploaded />
        <SharedFolders />
      </div>
    </div>
  );
};
