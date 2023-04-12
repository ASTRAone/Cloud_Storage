import React, { useEffect, useState } from 'react';

import { FileResponse } from '@api/FileApi/models';

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

  const [fileData, setFileData] = useState<FileResponse[]>([]);

  useEffect(() => {
    const sortedData = [...file].sort((a, b) => (a.type > b.type ? 1 : -1)) as FileResponse[];
    setFileData(sortedData);
  }, []);

  const openFile = (dirId: string) => {
    dispatch(selectedDir(dirId));
    dispatch(pushToStack(dirId));
  };

  return (
    <div className={cx('container')}>
      {file.length > 0 && (
        <div className={cx('header')}>
          <div className={cx('sort-name')}>Name</div>
          <div className={cx('sort-date')}>Date</div>
          <div className={cx('sort-size')}>Size</div>
          <div className={cx('sort-delete')}>Delete</div>
          <div className={cx('sort-download')}>Download</div>
        </div>
      )}

      {fileData.length > 0 ? (
        fileData?.map((item) => (
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
