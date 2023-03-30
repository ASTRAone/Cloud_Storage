import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
  value: number;
  maxValue?: number;
  threshold?: number;
};

const ProgressBar: React.FC<Props> = ({ value, maxValue = 100, threshold = Infinity }) => {
  const cx = useStyles(styles);
  const percent = (value / maxValue) * 100;

  return (
    <div className={cx('progress')}>
      <div
        className={cx('progress-value', { warning: percent >= threshold })}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export { ProgressBar };
