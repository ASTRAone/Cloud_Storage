import React, { useEffect } from 'react';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { FileList } from '@components/FileList';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchFiles, getFilesData, popToStack, selectedDir, uploadFile } from '@store/file/data';

import styles from './styles.module.scss';
import { ModalCreateFile } from './components';

export const Disk: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { currentDir, dirStack, needUpdate } = useAppSelector(getFilesData);
  const { isOpened, openPopup, closePopup } = usePopupControls();

  useEffect(() => {
    dispatch(fetchFiles());
    console.log('wtf');
  }, []);

  // TODO поправить обновление
  useEffect(() => {
    console.log('currentDir, needUpdate ', currentDir, needUpdate);
    if (currentDir || needUpdate) {
      dispatch(fetchFiles(currentDir));
      console.log('EFFECTED');
    }
  }, [needUpdate, currentDir]);

  const goBack = () => {
    const newStackDir = [...dirStack];
    const backDirId = newStackDir.pop();
    dispatch(popToStack(backDirId));
    dispatch(selectedDir(newStackDir.pop()));
  };

  const submitUploadFile = (data: any) => {
    const files = [...data];
    files.forEach((file: unknown) => {
      console.log('UPLOAD!');
      dispatch(uploadFile({ file, parent: currentDir }));
    });
  };

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('btns')}>
          {!!dirStack.length && (
            <Button
              className={cx('back')}
              text="Назад"
              onClick={goBack}
            />
          )}
          <Button
            variant="outline"
            onClick={openPopup}
            className={cx('create')}
            text="Создать папку"
          />
          <div className={cx('upload')}>
            <label
              htmlFor="upload"
              className={cx('label')}
            >
              Загрузить файл
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
