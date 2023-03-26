import React from 'react';

import { customDate } from '@src/utility/customDate';

import { FileResponse } from '@api/FileApi/models';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';

import styles from './styles.module.scss';

type Props = {
  file: FileResponse;
  onClick?: () => void;
};

export const File: React.FC<Props> = ({ file, onClick = () => {} }) => {
  const { name, size, type, date } = file;
  const cx = useStyles(styles);
  return (
    <div
      className={cx('container')}
      onClick={onClick}
    >
      <Icon
        size="xl"
        type={type === 'dir' ? 'folder' : 'file'}
        className={cx('img')}
      />
      <div className={cx('file-name')}>{name}</div>
      <div className={cx('file-date')}>{customDate(date)}</div>
      <div className={cx('file-size')}>{size}</div>
    </div>
  );
};
