import React, { useEffect, useState } from 'react';

import { ErrorUtils } from '@utils/ErrorUtils';

import { FileCreateDTO } from '@api/FileApi/models';

import { useStyles } from '@hooks/useStyles';
import { useToast } from '@hooks/useToast';

import { Input } from '@components/Input';
import { Modal } from '@components/Modal';
import { Icon } from '@components/icon';
import { Button } from '@components/Button';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { createFile, getStatusCreateFile } from '@store/file/data';

import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  currentDir?: string;
  title: string;
  text?: string;
};

export const ModalCreate: React.FC<Props> = ({ isOpen, closeModal, currentDir, title, text }) => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { statusCreate } = useAppSelector(getStatusCreateFile);
  const [textInput, setTextInput] = useState('');
  const [errors, setErrors] = useState(false);

  useEffect(() => () => closeModal(), []);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextInput(value);
  };

  const handleCreateFile = async (name: string) => {
    setErrors(false);
    const payload: FileCreateDTO = {
      name,
      type: 'dir',
    };

    if (currentDir) {
      payload.parent = currentDir;
    }
    try {
      await dispatch(createFile(payload)).unwrap();
      toast.success({ title: 'Папка успешно создана' });
      closeModal();
    } catch (error) {
      const errorMsg = ErrorUtils.handleApiError(error);
      toast.error({ title: 'Ошибка создания папки', text: errorMsg });
      setErrors(true);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      classNameContainer={cx('modal')}
    >
      <div className={cx('container')}>
        <p className={cx('title')}>{title}</p>
        {text ? (
          <div className={cx('loaded-container')}>
            <p className={cx('title')}>{text}</p>
          </div>
        ) : null}
        <Input
          onChange={handleChangeText}
          value={textInput}
          placeholder="Enter a folder name"
          errorText={errors ? 'Error creating folder' : ''}
        />
        <div className={cx('btn')}>
          <Button
            text="Create a folder"
            isUpperCase
            type="submit"
            color="light-blue"
            onClick={() => handleCreateFile(textInput)}
            disabled={!textInput}
            isLoading={statusCreate === 'loading'}
          />
        </div>
        <Icon
          type="close"
          className={cx('close')}
          onClick={closeModal}
        />
      </div>
    </Modal>
  );
};
