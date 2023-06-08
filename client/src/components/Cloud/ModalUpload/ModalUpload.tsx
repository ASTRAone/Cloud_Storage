import React, { useEffect, useState } from 'react';
import { SelectComponents } from 'react-select/dist/declarations/src/components';
import { GroupBase } from 'react-select';

import { ErrorUtils } from '@utils/ErrorUtils';
import { getFileExtension } from '@utils/data';

import { useStyles } from '@hooks/useStyles';
import { useToast } from '@hooks/useToast';

import { Modal } from '@components/Modal';
import { Icon } from '@components/icon';
import { Button } from '@components/Button';
import { Select } from '@components/Select';
import { ValueContainer } from '@components/Select/ValueContainer';
import { TextShorter } from '@components/TextShorter';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchFoldersPath, getFoldersPath, uploadFile } from '@store/file/data';

import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  uploadsFiles: File[];
  removeUploadFile: (fileName: string) => void;
};

const DEFAULT_VALUE = {
  label: '/',
  value: '',
};

export const ModalUpload: React.FC<Props> = ({
  isOpen,
  closeModal,
  uploadsFiles,
  removeUploadFile,
}) => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { foldersPaths, statusFoldersPath, statusUpload } = useAppSelector(getFoldersPath);
  const [selectValue, setSelectValue] = useState(DEFAULT_VALUE);

  useEffect(() => () => closeModal(), []);

  useEffect(() => {
    dispatch(fetchFoldersPath());
  }, []);

  const submit = () => {
    const value = selectValue.value;
    try {
      uploadsFiles.forEach(async (file) => {
        await dispatch(
          uploadFile({
            parent: value,
            file,
          }),
        ).unwrap();
      });
      toast.success({ title: 'Well done!', text: 'Your message has been sent successfully.' });
    } catch (error) {
      const errorMsg = ErrorUtils.handleApiError(error);
      toast.error({ title: 'Error!', text: errorMsg });
    }
  };

  const innerComponent: Partial<SelectComponents<unknown, boolean, GroupBase<unknown>>> = {
    ValueContainer: ({ children, ...props }) => (
      <ValueContainer
        {...props}
        className={cx('menu')}
      >
        <span className={cx('icon')}>
          <Icon type="folder" />
        </span>
        <span className={cx('value')}>{children}</span>
      </ValueContainer>
    ),
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      classNameContainer={cx('modal')}
    >
      <div className={cx('container')}>
        <p className={cx('title')}>Choose a path for loading:</p>
        <Select
          options={[DEFAULT_VALUE, ...foldersPaths]}
          onChange={setSelectValue}
          value={selectValue}
          components={innerComponent}
          isSearchable={false}
          maxMenuHeight={115}
          isLoading={statusFoldersPath === 'loading'}
          className={cx('select')}
        />
        <div className={cx('loaded-container')}>
          <p className={cx('title')}>Loaded files:</p>
          <div className={cx('loaded-files')}>
            <div className={cx('loaded-files-content')}>
              {uploadsFiles.map((item, index) => {
                const type = getFileExtension(item.name);
                // TODO допилить типы иконок
                console.log('type', type);
                return (
                  <div
                    className={cx('loaded-file')}
                    key={index}
                  >
                    <Icon
                      type="file"
                      className={cx('icon')}
                    />
                    <TextShorter
                      tooltip
                      className={cx('text')}
                    >
                      {item.name}
                    </TextShorter>
                    <Icon
                      type="close"
                      className={cx('icon-close')}
                      onClick={() => removeUploadFile(item.name)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={cx('btn')}>
          <Button
            text="upload"
            isUpperCase
            color="light-blue"
            onClick={submit}
            isLoading={statusUpload === 'loading'}
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
