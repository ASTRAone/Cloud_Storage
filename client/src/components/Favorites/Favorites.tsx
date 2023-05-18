import React from 'react';

import { FolderView } from '@utils/common';

import { StorageService } from '@services/StorageService';

import { useStyles } from '@hooks/useStyles';

import { FileList } from '@components/FileList';
import { FoldersViewed } from '@components/FoldersViewed';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getFilesData, viewFolder } from '@store/favorites/data';

import styles from './styles.module.scss';

const storageService = StorageService.getInstance();

export const Favorites: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { view, favoritesData, status } = useAppSelector(getFilesData);

  const onChangeFolderViewed = (view: FolderView) => {
    storageService.setItem('viewFolderFavorites', view);
    dispatch(viewFolder(view));
  };

  return (
    <div className={cx('page')}>
      <div className={cx('header')}>
        <h3 className={cx('title')}>Favorites folders</h3>
        {!!favoritesData.length && (
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
          isLoading={status === 'loading' && favoritesData.length === 0}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
