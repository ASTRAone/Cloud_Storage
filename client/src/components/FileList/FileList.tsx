import React from 'react';

import { sortedData } from '@src/utility/data';

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
  const { file, view } = useAppSelector(getFilesData);
  const fileData = sortedData(file) as FileResponse[];

  // const openFile = (dirId: string, nameDir: string) => {
  const openFile = (dirId: string) => {
    // dispatch(selectedDir({ dirId, nameDir }));
    // dispatch(pushToStack({ dirId, nameDir }));
    dispatch(selectedDir(dirId));
    dispatch(pushToStack(dirId));
  };

  return (
    <div className={cx(view === 'list' ? 'container' : 'container-plate')}>
      {view === 'list' && file.length > 0 && (
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
            view={view}
            file={item}
            key={item._id}
            // onClick={item.type === 'dir' ? () => openFile(item._id, item.name) : undefined}
            onClick={item.type === 'dir' ? () => openFile(item._id) : undefined}
          />
        ))
      ) : (
        <EmptyComponent />
      )}
    </div>
  );
};
