import React, { useEffect } from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { Button } from '@components/Button';

import styles from './styles.module.scss';
export type DialogProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  onSubmit?: () => void;
  id?: string;
  title: string;
  text?: string;
  btnOkText?: string;
  btnCancelText?: string;
  loading?: boolean;
  type?: 'delete' | 'edit' | 'warning' | 'info';
};

export const Dialog: React.FC<DialogProps> = ({
  closeModal = () => {},
  title,
  text,
  btnOkText = 'OK',
  btnCancelText = 'Cancel',
  onSubmit,
  loading = false,
  type = 'delete',
}) => {
  const cx = useStyles(styles);

  useEffect(() => () => closeModal(), []);

  return (
    <div className={cx('container')}>
      <p className={cx('title')}>{title}</p>
      {text ? (
        <div className={cx('dialog-container')}>
          <p className={cx('text')}>{text}</p>
        </div>
      ) : null}
      <div className={cx('btn')}>
        {btnOkText && onSubmit && type == 'delete' ? (
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
  );
};
