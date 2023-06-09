import React, { AnimationEventHandler, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Size } from '@utils/common';
import { ANIMATION_TIME } from '@utils/contants';

import { useStyles } from '@hooks/useStyles';
import { useMount } from '@hooks/useMount';

import styles from './styles.module.scss';

type Props = React.ComponentPropsWithRef<'div'> & {
  size?: Extract<Size, 'sm' | 'md' | 'lg'>;
  classNameContainer?: string;
  closeOnDocumentClick?: boolean;
  closeOnEscape?: boolean;
  opened: boolean;
  onClose?: () => void;
  onAnimationEnd?: AnimationEventHandler<HTMLDivElement>;
  children: JSX.Element;
};

const overlayAnimation = {
  enter: styles.overlayEnter,
  enterActive: styles.overlayEnterActive,
  exit: styles.overlayExit,
  exitActive: styles.overlayExitActive,
};

const contentAnimation = {
  enter: styles.contentEnter,
  enterActive: styles.contentEnterActive,
  exit: styles.contentExit,
  exitActive: styles.contentExitActive,
};

const Modal: React.FC<Props> = ({
  size = 'sm',
  className,
  classNameContainer,
  opened = false,
  closeOnDocumentClick,
  closeOnEscape = true,
  onAnimationEnd,
  onClose = () => {},
  children,
  ...rest
}) => {
  const cx = useStyles(styles);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [animationIn, setAnimationIn] = useState(false);
  const { mounted } = useMount({ opened });

  useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);

  if (!mounted && !opened) {
    return null;
  }

  useLayoutEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose && onClose();
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <div
      className={cx('container', classNameContainer)}
      {...rest}
    >
      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}
      >
        <div
          ref={overlayRef}
          className={cx('overlay')}
          onClick={onClose}
        />
      </CSSTransition>
      <CSSTransition
        in={animationIn}
        nodeRef={contentRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={contentAnimation}
      >
        <div
          ref={contentRef}
          className={cx('content', [size], className)}
        >
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export { Modal };
export type { Props as ModalProps };
