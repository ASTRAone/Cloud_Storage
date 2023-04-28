import React from 'react';

import { ErrorUtils } from '@utils/ErrorUtils';

import { customDate } from '@src/utility/customDate';

import { FileResponse } from '@api/FileApi/models';

import { useStyles } from '@hooks/useStyles';
import { usePopupControls } from '@hooks/usePopupControls';
import { useToast } from '@hooks/useToast';

import { Icon } from '@components/icon';
import { Dialog } from '@components/Dialog';
import { TextShorter } from '@components/TextShorter';

import { downloadFile, deleteFile, getStatusDelete } from '@store/file/data';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import styles from './styles.module.scss';

type Props = {
  file: FileResponse;
  view: 'list' | 'plate';
  onClick?: () => void;
};

export const File: React.FC<Props> = ({ file, view = 'list', onClick = () => {} }) => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { isOpened, openPopup, closePopup } = usePopupControls();
  const toast = useToast();
  const { statusDelete } = useAppSelector(getStatusDelete);
  const { name, size, type, date } = file;

  // TODO при удалении файла или папки дизейблить кнопку удаления
  // TODO сделать сохранение отображения папок: плитка/лист

  const openDeletePopup = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    openPopup();
  };

  const downloadClickHandler = async () => {
    await dispatch(downloadFile(file)).unwrap();
  };

  const deleteClickHandler = async () => {
    try {
      await dispatch(deleteFile(file)).unwrap();
      closePopup();
      toast.success({ title: 'Успешно удалено' });
    } catch (error) {
      const errorMsg = ErrorUtils.handleApiError(error);
      toast.error({ title: 'Ошибка авторизации', text: errorMsg });
    }
  };
  return (
    <>
      <div
        className={cx(view === 'list' ? 'container' : 'container-plate')}
        onClick={onClick}
      >
        <Icon
          type={type === 'dir' ? 'bigfolder' : 'file'}
          className={cx('icon')}
          size="xl"
        />
        <TextShorter
          tooltip
          className={cx('file-name', view)}
        >
          <>{name}</>
        </TextShorter>
        <div className={cx('file-date')}>{customDate(date).fullDate}</div>
        <div className={cx('file-size')}>{size}</div>
        <div
          className={cx('file-delete')}
          onClick={openDeletePopup}
        >
          {view === 'list' && (
            <Icon
              type="remove"
              className={type === 'dir' ? cx('folder_icon') : cx('icon')}
            />
          )}
        </div>
        {file.type !== 'dir' && view === 'list' && (
          <div
            onClick={() => downloadClickHandler()}
            className={cx('file-download')}
          >
            <Icon
              type="download"
              className={cx('icon')}
              size="xl"
            />
          </div>
        )}
      </div>
      {isOpened ? (
        <Dialog
          isOpen
          btnOkText="Delete"
          btnCancelText="Cancel"
          closeModal={closePopup}
          title="Do you want to delete this file?"
          text={name}
          onSubmit={deleteClickHandler}
          loading={statusDelete === 'loading'}
        />
      ) : null}
    </>
  );
};
