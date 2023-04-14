import React, { useEffect } from 'react';

import { useStyles } from '@hooks/useStyles';

import { Modal } from '@components/Modal';
import { Icon } from '@components/icon';
import { Button } from '@components/Button';

import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

export const ModalUpload: React.FC<Props> = ({ closeModal }) => {
  const cx = useStyles(styles);

  useEffect(() => () => closeModal(), []);

  return (
    <Modal
      open={false}
      classNamePrefix={cx('modal')}
    >
      <div className={cx('container')}>
        <p className={cx('title')}>Choose a path for loading:</p>
        {/* TODO: сделать свой селект */}
        <div style={{ background: 'gray', height: '37px' }} />
        <div className={cx('loaded-container')}>
          <p className={cx('title')}>Loaded files:</p>
          <div className={cx('loaded-files')}>
            <div className={cx('loaded-files-content')}>
              <div className={cx('loaded-file')}>
                <Icon
                  type="file"
                  className={cx('icon')}
                />
                <p className={cx('text')}>Porno.mvm</p>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('btn')}>
          <Button
            text="upload"
            isUpperCase
            color="light-blue"
          />
        </div>
        <Icon
          type="close"
          className={cx('close')}
        />
      </div>
    </Modal>
  );
};
