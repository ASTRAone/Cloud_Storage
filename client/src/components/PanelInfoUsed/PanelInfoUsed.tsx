import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { ProgressBar } from '@components/ProgressBar';

import styles from './styles.module.scss';

type Props = {
  usedGb?: number;
  usedProcent?: number;
  freeGb?: number;
};

export const PanelInfoUsed: React.FC<Props> = ({ usedGb = 0, usedProcent = 0, freeGb = 0 }) => {
  const cx = useStyles(styles);
  return (
    <div className={cx('container')}>
      <p className={cx('text-used')}>
        {usedGb} <span className={cx('span')}>gb</span> used
      </p>
      <p className={cx('text-info')}>
        {usedProcent}% used - {freeGb} GB free
      </p>
      <ProgressBar
        value={usedProcent}
        threshold={90}
      />
    </div>
  );
};
