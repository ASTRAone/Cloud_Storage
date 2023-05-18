import React, { AnimationEventHandler, useLayoutEffect } from 'react';
import ReactPopup from 'reactjs-popup';
import { PopupProps } from 'reactjs-popup/dist/types';

import { Size } from '@utils/common';

import { useStyles } from '@hooks/useStyles';

import { InputStub } from '@components/Popup/InputStub';

import styles from './styles.module.scss';

type Props = PopupProps & {
  size?: Extract<Size, 'sm' | 'md' | 'lg'>;
  classNamePrefix?: string;
  onAnimationEnd?: AnimationEventHandler<HTMLDivElement>;
  // lockBodyScroll?: boolean;
};

const DEFAULT_OVERLAY_STYLES = { background: 'rgba(26, 32, 36, 0.5)' };

const Modal: React.FC<Props> = ({
  children,
  overlayStyle = DEFAULT_OVERLAY_STYLES,
  size = 'sm',
  className,
  classNamePrefix,
  closeOnDocumentClick = false,
  closeOnEscape = false,
  onAnimationEnd,
  onClose,
  // lockBodyScroll = true,
  open,
  ...rest
}) => {
  const cx = useStyles(styles);

  useLayoutEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose && onClose();
      }
    };
    window.addEventListener('keydown', close);

    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <ReactPopup
      modal
      className={classNamePrefix}
      closeOnDocumentClick={closeOnDocumentClick}
      closeOnEscape={closeOnEscape}
      open={open}
      onClose={onClose}
      {...rest}
      {...{ overlayStyle }}
    >
      <InputStub />
      <div
        className={cx('modal', [size], className)}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    </ReactPopup>
  );
};

export { Modal };
export type { Props as ModalProps };
