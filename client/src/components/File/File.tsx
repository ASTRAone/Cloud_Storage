import React from 'react';

import { ErrorUtils } from '@utils/ErrorUtils';
import { FolderView } from '@utils/common';

import { customDate } from '@src/utility/customDate';

import { FileResponse } from '@api/FileApi/models';

import { useStyles } from '@hooks/useStyles';
import { useToast } from '@hooks/useToast';
import { useDialog } from '@hooks/useDialog';

import { Icon } from '@components/icon';
import { TextShorter } from '@components/TextShorter';

import { useAppSelector } from '@store/hooks';
import { downloadFile, deleteFile, getStatusDelete } from '@store/file/data';
import { useAppDispatch } from '@store/hooks';

import styles from './styles.module.scss';

type Props = {
  file: FileResponse;
  view: FolderView;
  onClick?: () => void;
  isFavorite?: boolean;
};

export const File: React.FC<Props> = ({
  file,
  view = 'list',
  onClick = () => {},
  isFavorite = false,
}) => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { statusDelete } = useAppSelector(getStatusDelete);
  const { name, size, type, date } = file;
  const { Dialog, openPopup, closePopup } = useDialog();

  // TODO при удалении файла или папки дизейблить кнопку удаления
  // TODO переписать компонент: разделить его на 2 вида папок

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
      toast.success({ title: 'Well done!', text: 'Your message has been sent successfully.' });
    } catch (error) {
      const errorMsg = ErrorUtils.handleApiError(error);
      toast.error({ title: 'Error!', text: errorMsg });
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
        {isFavorite && (
          <Icon
            type="like"
            className={cx('icon-like')}
          />
        )}
      </div>
      <Dialog
        closeDialog={closePopup}
        onConfirm={deleteClickHandler}
        loading={statusDelete === 'loading'}
        title="Do you want to delete this file?"
      />
    </>
  );
};
