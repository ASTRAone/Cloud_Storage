import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

export const Loader: React.FC<Props> = ({ className }) => {
  const cx = useStyles(styles);
  return (
    <Icon
      type="spinner"
      className={cx('loader', className)}
    />
  );
};
