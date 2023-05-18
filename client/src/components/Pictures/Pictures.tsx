import React from 'react';

import { FolderView } from '@utils/common';

import { StorageService } from '@services/StorageService';

import { useStyles } from '@hooks/useStyles';

import { FoldersViewed } from '@components/FoldersViewed';
import { FileList } from '@components/FileList';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getFilesData, viewFolder } from '@store/pictures/data';

import styles from './styles.module.scss';

const storageService = StorageService.getInstance();

export const Pictures: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();

  const { picturesData, view, status } = useAppSelector(getFilesData);

  const onChangeFolderViewed = (view: FolderView) => {
    storageService.setItem('viewFolderPictures', view);
    dispatch(viewFolder(view));
  };

  return (
    <div className={cx('page')}>
      <div className={cx('header')}>
        <h3 className={cx('title')}>Pictures</h3>
        {!!picturesData.length && (
          <FoldersViewed
            view={view}
            onChange={onChangeFolderViewed}
          />
        )}
      </div>

      <div className={cx('content')}>
        <FileList
          data={[]}
          view={view}
          isLoading={status === 'loading'}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
