import React from 'react';
import toast, { Toast } from 'react-hot-toast';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { Loader } from '@components/Loader';

import styles from './styles.module.scss';

// TODO подумать над size
type Props = {
  title?: string;
  text?: string;
  hasClose?: boolean;
  toastItem?: Toast;
  // size?: 'md' | 'lg';
};

export const ToastLoading: React.FC<Props> = ({ title, text, hasClose = true, toastItem }) => {
  const cx = useStyles(styles);
  const onClose = () => toast.dismiss(toastItem?.id);
  return (
    <div className={cx('toast-loading')}>
      <div className={cx('content')}>
        <p className={cx('title')}>{title}</p>
        <p className={cx('text')}>{text}</p>
      </div>

      <div className={cx('container-icon-result')}>
        <Loader className={cx('loader')} />
      </div>
      <div className={cx('container-icon')}>
        <Icon
          type="bubbles"
          className={cx('icon')}
        />
      </div>
      {hasClose && (
        <div className={cx('container-icon-close')}>
          <Icon
            type="close"
            className={cx('icon')}
            onClick={onClose}
          />
        </div>
      )}
    </div>
  );
};

export type { Props as ToastLoadingProps };
