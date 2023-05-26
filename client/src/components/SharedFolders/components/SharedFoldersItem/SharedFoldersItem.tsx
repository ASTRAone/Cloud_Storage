import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';

import styles from './styles.module.scss';

// TODO: добавить типы

export const SharedFoldersItem: React.FC = () => {
  const cx = useStyles(styles);

  return (
    <div className={cx('container')}>
      <div className={cx('content-left')}>
        <div className={cx('container-icon')}>
          <Icon
            type="shared-folder"
            className={cx('icon')}
          />
        </div>
        <div className={cx('container-text')}>
          <p className={cx('title')}>Sketch Files</p>
          <p className={cx('text')}>Shared with: mike@getnextdesign.com</p>
        </div>
      </div>
      <div className={cx('content-right')}>
        <p className={cx('date')}>10 oct</p>
        <p className={cx('time')}>10:23pm</p>
      </div>
    </div>
  );
};
