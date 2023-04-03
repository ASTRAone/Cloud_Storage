import React from 'react';
import { useTranslation } from 'react-i18next';

import { useStyles } from '@hooks/useStyles';

import { ProgressBar } from '@components/ProgressBar';

import styles from './styles.module.scss';

type Props = {
  usedGb?: number;
  usedProcent?: number;
  freeGb?: number;
  className?: string;
};

export const PanelInfoUsed: React.FC<Props> = ({
  usedGb = 0,
  usedProcent = 0,
  freeGb = 0,
  className = '',
}) => {
  const cx = useStyles(styles);
  const { t } = useTranslation();
  return (
    <div className={cx('container', className)}>
      <p className={cx('text-used')}>
        {usedGb} <span className={cx('span')}>{t('common.gb')}</span> {t('common.used')}
      </p>
      <p className={cx('text-info')}>
        {usedProcent}% {t('common.used')} - {freeGb} {t('common.Gb')} {t('common.free')}
      </p>
      <ProgressBar
        value={usedProcent}
        threshold={90}
      />
    </div>
  );
};
