import React, { useEffect } from 'react';

import { FolderView } from '@utils/common';

import { StorageService } from '@services/StorageService';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';
import { useDebounce } from '@hooks/useDebounce';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { FileList } from '@components/FileList';
import { Icon } from '@components/icon';
import { Breadcrumbs } from '@components/Breadcrumbs';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  fetchFiles,
  getFilesData,
  selectedDir,
  viewFolder,
  uploadFile,
  clearBeadcrumbsStack,
  fetchBreadCrumbs,
} from '@store/file/data';

import styles from './styles.module.scss';
import { ModalCreate } from './components/ModalCreate/ModalCreate';

const storageService = StorageService.getInstance();

export const Disk: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { currentDir, breadCrumbsStack, needUpdate, searchableText } = useAppSelector(getFilesData);
  const { isOpened, openPopup, closePopup } = usePopupControls();

  const debouncedSearchValue = useDebounce(searchableText, 500);

  useEffect(() => {
    dispatch(fetchFiles({}));
    dispatch(clearBeadcrumbsStack());
  }, []);

  useEffect(() => {
    dispatch(fetchFiles({ dirId: currentDir, searchableText }));
  }, [currentDir, debouncedSearchValue]);

  useEffect(() => {
    if (needUpdate) {
      dispatch(fetchFiles({ dirId: currentDir }));
    }
  }, [needUpdate]);

  const handlerBreadcrumbs = (dirId: string, index: number) => {
    dispatch(selectedDir(dirId));
    if (index === -1) {
      dispatch(clearBeadcrumbsStack());
    } else {
      dispatch(fetchBreadCrumbs(dirId));
    }
  };

  const submitUploadFile = async (data: any) => {
    const files = [...data];
    files.forEach((file) => {
      dispatch(uploadFile({ file, parent: currentDir }));
    });
  };

  const changeViewFolders = (view: FolderView) => {
    dispatch(viewFolder(view));
    storageService.setItem('viewFolder', view);
  };

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('btns')}>
          <div className={cx('btns_left')}>
            <Button
              variant="outline"
              onClick={openPopup}
              className={cx('create')}
              text="Create a folder"
            />
          </div>
          <div className={cx('upload')}>
            <label
              htmlFor="upload"
              className={cx('label')}
            >
              Load a file
            </label>
            <Input
              multiple
              onChange={(e) => submitUploadFile(e.target.files)}
              type="file"
              id="upload"
              className={cx('input')}
            />
          </div>
          <div className={cx('btns_right')}>
            <Icon
              type="tile"
              className={cx('icon')}
              size="xl"
              onClick={() => changeViewFolders('plate')}
            />
            <Icon
              type="list"
              className={cx('icon')}
              size="xl"
              onClick={() => changeViewFolders('list')}
            />
          </div>
        </div>
        <Breadcrumbs
          breadcrumbsPath={breadCrumbsStack ?? []}
          navDir={handlerBreadcrumbs}
        />
        <FileList />
      </div>
      {isOpened && (
        <ModalCreate
          isOpen={isOpened}
          closeModal={closePopup}
          currentDir={currentDir}
          title="Enter a name of directory"
        />
      )}
    </>
  );
};
