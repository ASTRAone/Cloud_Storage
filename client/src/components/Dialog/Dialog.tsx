import React, { useEffect } from 'react';

import { useStyles } from '@hooks/useStyles';

import { Modal } from '@components/Modal';
import { Icon } from '@components/icon';
import { Button } from '@components/Button';

import styles from './styles.module.scss';
type Props = {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit?: () => void;
  id?: string;
  title: string;
  text?: string;
  btnOkText?: string;
  btnCancelText?: string;
  loading?: boolean;
};

export const Dialog: React.FC<Props> = ({
  isOpen,
  closeModal,
  title,
  text,
  btnOkText,
  btnCancelText,
  onSubmit,
  loading = false,
}) => {
  const cx = useStyles(styles);

  useEffect(() => () => closeModal(), []);

  return (
    <Modal
      open={isOpen}
      classNamePrefix={cx('dialog')}
    >
      <div className={cx('container')}>
        <p className={cx('title')}>{title}</p>
        {text ? (
          <div className={cx('dialog-container')}>
            <p className={cx('text')}>{text}</p>
          </div>
        ) : null}
        <div className={cx('btn')}>
          {btnOkText ? (
            <Button
              text={btnOkText}
              isUpperCase
              type="submit"
              color="light-blue"
              onClick={onSubmit}
              isLoading={loading}
            />
          ) : null}
          {btnCancelText ? (
            <Button
              text={btnCancelText}
              isUpperCase
              type="submit"
              color="white"
              onClick={closeModal}
            />
          ) : null}
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
