import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ToastContainerProps } from 'react-toastify/dist/types';

import { useStyles } from '@hooks/useStyles';

import styles from './toast.module.scss';

type Props = ToastContainerProps & {
  classNameContainer?: string;
  toastContentClassName?: string;
};

export const Toast: React.FC<Props> = ({
  position = 'top-right',
  autoClose = 25000000,
  hideProgressBar = false,
  newestOnTop = false,
  rtl = false,
  pauseOnFocusLoss = false,
  draggable = false,
  pauseOnHover = true,
  theme = 'light',
  classNameContainer,
  toastContentClassName,
  ...restProps
}) => {
  const cx = useStyles(styles);
  return (
    <ToastContainer
      {...restProps}
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick
      rtl={rtl}
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      theme={theme}
      className={cx('toast', classNameContainer)}
      toastClassName={cx('toast-body', toastContentClassName)}
    />
  );
};
