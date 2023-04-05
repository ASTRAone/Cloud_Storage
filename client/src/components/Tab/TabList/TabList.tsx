import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
  children?: JSX.Element[];
};

export const TabList: React.FC<Props> = ({ children }) => {
  const cx = useStyles(styles);
  return <div className={cx('container')}>{children}</div>;
};
