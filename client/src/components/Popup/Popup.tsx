import React from 'react';
import ReactPopup from 'reactjs-popup';
import { PopupProps } from 'reactjs-popup/dist/types';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = PopupProps & {
  // size?: Extract<Size, 'sm' | 'md' | 'lg' | 'xl'>;
  classNamePrefix?: string;
  lockBodyScroll?: boolean;
  trigger?: JSX.Element;
};

const Popup: React.FC<Props> = ({
  children,
  className,
  on = 'click',
  position = 'bottom right',
  arrow = false,
  trigger,
  classNamePrefix,
  open,
  ...rest
}) => {
  const cx = useStyles(styles);
  const triggerWithBlock = <div>{trigger}</div>;

  return (
    <ReactPopup
      trigger={triggerWithBlock}
      on={on}
      position={position}
      arrow={arrow}
      className={classNamePrefix}
      open={open}
      {...rest}
    >
      {/* <InputStub /> */}
      <div className={cx('popup', className)}>{children}</div>
    </ReactPopup>
  );
};
export { Popup };
