import React, { MouseEvent } from 'react';

import { customDate } from '@src/utility/customDate';

import { FileResponse } from '@api/FileApi/models';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';

import { downloadFile, deleteFile } from '@store/file/data';
import { useAppDispatch } from '@store/hooks';

import styles from './styles.module.scss';

type Props = {
  file: FileResponse;
  view: 'list' | 'plate';
  onClick?: () => void;
};

export const File: React.FC<Props> = ({ file, view = 'list', onClick = () => {} }) => {
  const { name, size, type, date } = file;
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();

  const downloadClickHandler = () => {
    dispatch(downloadFile(file));
  };
  const deleteClickHandler = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteFile(file));
  };
  return (
    <div
      className={cx(view == 'list' ? 'container' : 'container-plate')}
      onClick={onClick}
    >
      <Icon
        type={type === 'dir' ? 'bigfolder' : 'file'}
        className={cx('icon')}
        size="xl"
      />
      <div className={cx('file-name')}>{name}</div>
      <div className={cx('file-date')}>{customDate(date).fullDate}</div>
      <div className={cx('file-size')}>{size}</div>
      <div
        className={cx('file-delete')}
        onClick={(e) => deleteClickHandler(e)}
      >
        {view == 'list' && (
          <Icon
            type="remove"
            className={type === 'dir' ? cx('folder_icon') : cx('icon')}
          />
        )}
      </div>
      {file.type !== 'dir' && view == 'list' && (
        <div
          onClick={() => downloadClickHandler()}
          className={cx('file-download')}
        >
          <Icon
            type="download"
            className={cx('icon')}
            size="xl"
          />
        </div>
      )}
    </div>
  );
};
