import React from 'react';
import { Toast } from 'react-toastify/dist/types';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';

import styles from './styles.module.scss';

// TODO подумать над size
type Props = {
  title?: string;
  text?: string;
  hasClose?: boolean;
  toastItem?: Toast;
  // size?: 'md' | 'lg';
};

export const ToastSuccess: React.FC<Props> = ({ title, text }) => {
  const cx = useStyles(styles);

  return (
    <div className={cx('toast-success')}>
      <div className={cx('content')}>
        <p className={cx('title')}>{title}</p>
        <p className={cx('text')}>{text}</p>
      </div>

      <div className={cx('container-icon-result')}>
        <Icon
          type="success"
          className={cx('icon')}
        />
      </div>
      <div className={cx('container-icon')}>
        <Icon
          type="bubbles"
          className={cx('icon')}
        />
      </div>
    </div>
  );
};

export type { Props as ToastSuccessProps };
