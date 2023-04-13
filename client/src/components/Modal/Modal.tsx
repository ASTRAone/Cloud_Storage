import React, { AnimationEventHandler } from 'react';
import ReactPopup from 'reactjs-popup';
import { PopupProps } from 'reactjs-popup/dist/types';

import { useStyles } from '@hooks/useStyles';

import { InputStub } from '@components/Popup/InputStub';

import styles from './styles.module.scss';

type Props = PopupProps & {
  // size?: Extract<Size, 'sm' | 'md' | 'lg'>;
  classNamePrefix?: string;
  onAnimationEnd?: AnimationEventHandler<HTMLDivElement>;
  // lockBodyScroll?: boolean;
};

const DEFAULT_OVERLAY_STYLES = { background: 'rgba(26, 32, 36, 0.5)' };

const Modal: React.FC<Props> = ({
  children,
  overlayStyle = DEFAULT_OVERLAY_STYLES,
  // size,
  className,
  classNamePrefix,
  onAnimationEnd,
  // lockBodyScroll = true,
  open,
  ...rest
}) => {
  const cx = useStyles(styles);

  return (
    <ReactPopup
      {...{ overlayStyle }}
      {...rest}
      className={classNamePrefix}
      open={open}
    >
      <InputStub />
      <div
        className={cx('modal', className)}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    </ReactPopup>
  );
};

export { Modal };
export type { Props as ModalProps };
