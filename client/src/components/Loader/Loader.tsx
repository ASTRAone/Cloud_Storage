import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';

import styles from './styles.module.scss';

export const Loader: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <Icon
      type="spinner"
      className={cx('loader')}
    />
  );
};
