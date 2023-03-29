import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

const cx = useStyles(styles);
export const FooterLayout: React.FC = () => {
  return (
    <div className={cx('container')}>
      <p className={cx('text')}>Copyryght @cloudvlados 2023 | Privacy Policy</p>
    </div>
  );
};
