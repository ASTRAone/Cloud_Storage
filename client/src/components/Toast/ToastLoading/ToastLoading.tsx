import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { Loader } from '@components/Loader';

import styles from './styles.module.scss';

// TODO подумать над size
type Props = {
  title?: string;
  text?: string;
  hasClose?: boolean;
  toastItem?: any;
  // size?: 'md' | 'lg';
};

export const ToastLoading: React.FC<Props> = ({ title, text }) => {
  const cx = useStyles(styles);
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
    </div>
  );
};

export type { Props as ToastLoadingProps };
