import React, { DragEvent, useState } from 'react';

import { useStyles } from '@hooks/useStyles';
import { usePopupControls } from '@hooks/usePopupControls';

import { Icon } from '@components/icon';
import { ModalUpload } from '@components/Cloud/ModalUpload';
import { Input } from '@components/Input';

import styles from './styles.module.scss';

export const DrageComponent: React.FC = () => {
  const cx = useStyles(styles);
  const { isOpened, openPopup, closePopup } = usePopupControls();
  const [uploadsFiles, setUploadsFiles] = useState<any>();

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = [...(event.dataTransfer.files as any)];
    setUploadsFiles(files);
    openPopup();
  };

  const handleUploadFileExplorer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...(event.target.files as any)];
    setUploadsFiles(files);
    openPopup();
  };

  return (
    <>
      <div
        className={cx('container')}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragEnter}
        onDrop={handleDrop}
      >
        <label
          htmlFor="upload"
          className={cx('upload')}
        >
          <Icon
            type="drage"
            className={cx('icon')}
          />
          <p className={cx('text')}>drag files to upload</p>
        </label>
      </div>
      <Input
        type="file"
        id="upload"
        className={cx('input-upload')}
        onChange={handleUploadFileExplorer}
        multiple
      />
      {isOpened && (
        <ModalUpload
          isOpen={isOpened}
          closeModal={closePopup}
          uploadsFiles={uploadsFiles}
        />
      )}
    </>
  );
};
