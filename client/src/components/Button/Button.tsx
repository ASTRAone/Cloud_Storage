import React, { cloneElement } from 'react';

import { IconObject, Size } from '@src/utility/common';

import { useStyles } from '@hooks/useStyles';

import { IconTypes } from '@components/icon/IconDictionary';
import { Loader } from '@components/Loader';

import styles from './styles.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ligth' | 'outline' | 'empty';
  isIcon?: boolean;
  typeIcon?: IconTypes;
  sizeIcon?: Size;
  isLoading?: boolean;
  text?: string;
  className?: string;
  full?: boolean;
  actions?: Array<IconObject>;
};

export const Button: React.FC<Props> = ({
  // variant = 'ligth',
  isIcon,
  typeIcon,
  sizeIcon,
  className,
  isLoading = false,
  text,
  type = 'button',
  full = false,
  actions = [],
  ...restProps
}) => {
  const cx = useStyles(styles);

  const actionsLeft: Array<JSX.Element> = [];
  const actionsRight: Array<JSX.Element> = [];

  if (actions) {
    actions.forEach((elem) => {
      console.log('elem', elem);
      const icon = cloneElement(elem.icon, {
        key: elem.icon.type,
        ...elem.icon.props,
        className: cx(elem.icon.props.className, 'icon'),
      });
      elem.align === 'left' ? actionsLeft.push(icon) : actionsRight.push(icon);
    });
  }

  return (
    <button
      {...restProps}
      type={type}
      className={cx('btn', full ? 'full' : '')}
    >
      <div className={cx('container')}>
        <div className={cx('content')}>
          {isLoading ? (
            <div className={cx('spinner')}>
              <Loader className={cx('loader')} />
            </div>
          ) : (
            <div className={cx('contentText')}>
              {actionsLeft}
              {text && <div className={cx('caption')}>{text}</div>}
              {actionsRight}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
