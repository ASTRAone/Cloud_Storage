import React, { useEffect } from 'react';
import { SelectComponents } from 'react-select/dist/declarations/src/components';
import { GroupBase } from 'react-select';

import { useStyles } from '@hooks/useStyles';

import { Modal } from '@components/Modal';
import { Icon } from '@components/icon';
import { Button } from '@components/Button';
import { Select } from '@components/Select';
import { ValueContainer } from '@components/Select/ValueContainer';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchFoldersPath, getFoldersPath } from '@store/file/data';

import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  uploadsFiles: any[];
};

const DEFAULT_VALUE = [
  {
    label: '/',
    value: '/',
  },
];

export const ModalUpload: React.FC<Props> = ({ isOpen, closeModal, uploadsFiles }) => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();

  const { foldersPaths } = useAppSelector(getFoldersPath);

  console.log('foldersPaths', foldersPaths);

  useEffect(() => () => closeModal(), []);

  useEffect(() => {
    dispatch(fetchFoldersPath());
  }, []);

  const submit = async () => {
    console.log('submit', uploadsFiles);
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
      classNamePrefix={cx('modal')}
    >
      <div className={cx('container')}>
        <p className={cx('title')}>Choose a path for loading:</p>
        <Select
          options={[
            ...DEFAULT_VALUE,
            {
              label: '/first',
              value: 'first',
            },
          ]}
          components={innerComponent}
          isSearchable={false}
          maxMenuHeight={115}
          defaultValue={DEFAULT_VALUE}
        />
        <div className={cx('loaded-container')}>
          <p className={cx('title')}>Loaded files:</p>
          <div className={cx('loaded-files')}>
            <div className={cx('loaded-files-content')}>
              {uploadsFiles.map((item, index) => (
                <div
                  className={cx('loaded-file')}
                  key={index}
                >
                  <Icon
                    type="file"
                    className={cx('icon')}
                  />
                  <p className={cx('text')}>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={cx('btn')}>
          <Button
            text="upload"
            isUpperCase
            color="light-blue"
            onClick={submit}
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
