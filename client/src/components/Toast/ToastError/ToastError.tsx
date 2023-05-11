import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';

import styles from './styles.module.scss';

type Props = {
  title?: string;
  text?: string;
};

export const ToastError: React.FC<Props> = ({ title, text }) => {
  const cx = useStyles(styles);

  return (
    <div className={cx('toast-error')}>
      <div className={cx('content')}>
        <p className={cx('title')}>{title}</p>
        <p className={cx('text')}>{text}</p>
      </div>

      <div className={cx('container-icon-result')}>
        <Icon
          type="error"
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

export type { Props as ToastErrorProps };
