import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
  title?: string;
  value?: number;
  isGb?: boolean;
  type?: 'light' | 'blue';
};

export const CellInfo: React.FC<Props> = ({
  title = '',
  value = 0,
  isGb = false,
  type = 'light',
}) => {
  const cx = useStyles(styles);

  if (!title && value === 0) return null;

  return (
    <div className={cx('container', type)}>
      <p className={cx('text')}>
        {title} : {value}
      </p>
      {isGb && <span className={cx('span')}>gb</span>}
    </div>
  );
};
