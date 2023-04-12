import React, { useEffect } from 'react';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { FileList } from '@components/FileList';
import { Icon } from '@components/icon';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  fetchFiles,
  getFilesData,
  popToStack,
  selectedDir,
  viewFolder,
  uploadFile,
} from '@store/file/data';

import styles from './styles.module.scss';
import { ModalCreateFile } from './components';

export const Disk: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { currentDir, dirStack, needUpdate } = useAppSelector(getFilesData);
  const { isOpened, openPopup, closePopup } = usePopupControls();

  useEffect(() => {
    dispatch(fetchFiles());
  }, []);

  //TODO поправить обновление
  useEffect(() => {
    if (currentDir || !needUpdate) {
      dispatch(fetchFiles(currentDir));
    }
  }, [needUpdate, currentDir]);

  const goBack = () => {
    const newStackDir = [...dirStack];
    const backDirId = newStackDir.pop();
    dispatch(popToStack(backDirId));
    dispatch(selectedDir(newStackDir.pop()));
  };

  const submitUploadFile = async (data: any) => {
    const files = [...data];
    files.forEach((file) => {
      dispatch(uploadFile({ file, parent: currentDir }));
    });
  };

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('btns')}>
          <div className={cx('btns_left')}>
            {!!dirStack.length && (
              <Button
                className={cx('back')}
                text="Back"
                onClick={goBack}
              />
            )}
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
              onClick={() => dispatch(viewFolder('plate'))}
            />
            <Icon
              type="list"
              className={cx('icon')}
              size="xl"
              onClick={() => dispatch(viewFolder('list'))}
            />
          </div>
        </div>
        <FileList />
      </div>
      {isOpened && (
        <ModalCreateFile
          isOpen={isOpened}
          closeModal={closePopup}
          currentDir={currentDir}
        />
      )}
    </>
  );
};
