import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { File } from '@components/File/File';
import { EmptyComponent } from '@components/EmptyComponent';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getFilesData, pushToStack, selectedDir } from '@store/file/data';

import styles from './styles.module.scss';

export const FileList: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { file } = useAppSelector(getFilesData);

  const openFile = (dirId: string) => {
    dispatch(selectedDir(dirId));
    dispatch(pushToStack(dirId));
  };

  return (
    <div className={cx('container')}>
      {file.length > 0 && (
        <div className={cx('header')}>
          <div className={cx('sort-name')}>Название</div>
          <div className={cx('sort-date')}>Дата</div>
          <div className={cx('sort-size')}>Размер</div>
        </div>
      )}

      {file.length > 0 ? (
        file?.map((item) => (
          <File
            file={item}
            key={item._id}
            onClick={item.type === 'dir' ? () => openFile(item._id) : undefined}
          />
        ))
      ) : (
        <EmptyComponent />
      )}
    </div>
  );
};
