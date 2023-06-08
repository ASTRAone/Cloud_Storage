import React, { useEffect } from 'react';

import { FolderView } from '@utils/common';
import { sortedData } from '@utils/data';

import { FileResponse } from '@api/FileApi/models';

import { StorageService } from '@services/StorageService';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';
import { useDebounce } from '@hooks/useDebounce';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { FileList } from '@components/FileList';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { FoldersViewed } from '@components/FoldersViewed';

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
  const { currentDir, breadCrumbsStack, needUpdate, searchableText, file, view, status } =
    useAppSelector(getFilesData);
  const { isOpened, openPopup, closePopup } = usePopupControls();
  const fileData = sortedData(file) as FileResponse[];

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

  const submitUploadFile = async (data: FileList | null) => {
    if (data === null) return;
    const files = [...(data as unknown as Array<File>)];
    files.forEach((file) => {
      dispatch(uploadFile({ file, parent: currentDir }));
    });
  };

  const openFile = (currentDir: string) => {
    dispatch(selectedDir(currentDir));
    dispatch(fetchBreadCrumbs(currentDir));
    // dispatch(pushBreadcrumbsStack({ dirId, name }));
  };

  const onChangeFolderViewed = (view: FolderView) => {
    dispatch(viewFolder(view));
    storageService.setItem('viewFolder', view);
  };

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('btns')}>
          <div className={cx('btns_left')} />
          <div className={cx('btns_right')}>
            <FoldersViewed
              view={view}
              onChange={onChangeFolderViewed}
            />
            <Button
              variant="outline"
              onClick={openPopup}
              classNameBtn={cx('create')}
              text="Create directory"
              typeIcon="small-folder"
            />
            <div className={cx('upload')}>
              <label
                htmlFor="upload"
                className={cx('label')}
              >
                Load files
              </label>
              <Input
                multiple
                onChange={(e) => submitUploadFile(e.target.files)}
                type="file"
                id="upload"
                className={cx('input')}
              />
            </div>
          </div>
        </div>
        <Breadcrumbs
          breadcrumbsPath={breadCrumbsStack ?? []}
          navDir={handlerBreadcrumbs}
        />
        <FileList
          data={fileData}
          view={view}
          isLoading={status === 'loading'}
          onClick={openFile}
        />
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
