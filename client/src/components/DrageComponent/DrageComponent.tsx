import React, { DragEvent } from 'react';

import { useStyles } from '@hooks/useStyles';
import { usePopupControls } from '@hooks/usePopupControls';

import { Icon } from '@components/icon';
import { ModalUpload } from '@components/Cloud/ModalUpload';

// import { useAppDispatch } from '@store/hooks';
// import { uploadFile } from '@store/file/data';
import styles from './styles.module.scss';

export const DrageComponent: React.FC = () => {
  const cx = useStyles(styles);
  const { isOpened, openPopup, closePopup } = usePopupControls();
  // const dispatch = useAppDispatch();

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
    openPopup();
    console.log('111');

    // const files = [...(event.dataTransfer.files as any)];
    // try {
    //   files.forEach((file) => {
    //     dispatch(uploadFile({ file }));
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
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
        <Icon
          type="drage"
          className={cx('icon')}
        />
        <p className={cx('text')}>drag files to upload</p>
      </div>
      <ModalUpload
        isOpen={isOpened}
        closeModal={closePopup}
      />
    </>
  );
};
