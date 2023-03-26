import React from 'react';

import { Size } from '@src/utility/common';

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
  className?: string;
};

export const Button: React.FC<Props> = ({
  variant = 'ligth',
  isIcon,
  typeIcon,
  sizeIcon,
  className,
  isLoading = false,
  text,
  ...restProps
}) => {
  const cx = useStyles(styles);

  return (
    <button
      className={cx('btn', className, variant)}
      {...restProps}
    >
      {isLoading ? <Loader /> : text}
      {isIcon && typeIcon && (
        <Icon
          type={typeIcon}
          size={sizeIcon}
        />
      )}
    </button>
  );
};
