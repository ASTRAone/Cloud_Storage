import React, { AnimationEventHandler, useLayoutEffect } from 'react';

import { Size } from '@utils/common';

import { useStyles } from '@hooks/useStyles';

import { InputStub } from '@components/Popup/InputStub';

import styles from './styles.module.scss';

type Props = React.ComponentPropsWithRef<'div'> & {
  size?: Extract<Size, 'sm' | 'md' | 'lg'>;
  classNameContainer?: string;
  closeOnDocumentClick?: boolean;
  closeOnEscape?: boolean;
  open: boolean;
  onClose?: () => void;
  onAnimationEnd?: AnimationEventHandler<HTMLDivElement>;
  children: JSX.Element;
};

const Modal: React.FC<Props> = ({
  size = 'sm',
  className,
  classNameContainer,
  open = false,
  closeOnDocumentClick,
  closeOnEscape = true,
  onAnimationEnd,
  onClose = () => {},
  children,
  ...rest
}) => {
  const cx = useStyles(styles);

  useLayoutEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose && onClose();
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return open ? (
    <div
      className={cx('container', classNameContainer)}
      {...rest}
    >
      <InputStub />
      <div
        className={cx('modal', [size], className)}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export { Modal };
export type { Props as ModalProps };
