import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { useStyles } from '@hooks/useStyles';

import { IconTypes } from '@components/icon/IconDictionary';

import styles from './styles.module.scss';

// TODO Сделать варианты цвета пропсами

type Props = NavLinkProps & {
  to?: string;
  text?: string;
  className?: string;
  isUpperCase?: boolean;
};

export const ButtonLink: React.FC<Props> = ({
  to,
  text,
  className,
  isUpperCase = false,
  children,
  ...rest
}) => {
  const cx = useStyles(styles);
  const content = text ?? children;

  return (
    <div className={cx('container')}>
      <NavLink
        to={to}
        className={cx(className, 'link', isUpperCase ? 'upperCase' : '')}
        {...rest}
      >
        {content}
      </NavLink>
    </div>
  );
};
