import React, { cloneElement } from 'react';

import { IconObject, Size } from '@src/utility/common';

import { useStyles } from '@hooks/useStyles';

import { IconTypes } from '@components/icon/IconDictionary';
import { Loader } from '@components/Loader';
import { Icon } from '@components/icon';

import styles from './styles.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ligth' | 'outline' | 'empty';
  isIcon?: boolean;
  typeIcon?: IconTypes;
  sizeIcon?: Size;
  isLoading?: boolean;
  text?: string;
  classNameBtn?: string;
  classNameContainer?: string;
  full?: boolean;
  color?: 'white' | 'gray' | 'blue' | 'light-blue';
  isUpperCase?: boolean;
  actions?: Array<IconObject>;
};

export const Button: React.FC<Props> = ({
  // variant = 'ligth',
  isIcon,
  typeIcon = 'default',
  sizeIcon,
  classNameBtn,
  classNameContainer,
  isLoading = false,
  text,
  type = 'button',
  full = false,
  actions = [],
  color = 'blue',
  isUpperCase = false,
  ...restProps
}) => {
  const cx = useStyles(styles);

  const actionsLeft: Array<JSX.Element> = [];
  const actionsRight: Array<JSX.Element> = [];

  if (actions) {
    actions.forEach((elem) => {
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
      className={cx('btn', classNameBtn, full ? 'full' : '')}
    >
      <div className={cx('container', classNameContainer, color)}>
        <div className={cx('content')}>
          {typeIcon !== 'default' && (
            <Icon
              type={typeIcon}
              className={cx('icon')}
            />
          )}
          {isLoading ? (
            <div className={cx('spinner')}>
              <Loader className={cx('loader')} />
            </div>
          ) : (
            <div className={cx('contentText')}>
              {actionsLeft}
              {text && <div className={cx('caption', isUpperCase ? 'upper' : '')}>{text}</div>}
              {actionsRight}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
