import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { FooterLayout } from '@components/FooterLayout';
import { HeaderLayout } from '@components/HeaderLayout';

import styles from './styles.module.scss';

type Props = {
  children?: JSX.Element;
};

export const LayoutStartPage: React.FC<Props> = ({ children }) => {
  const cx = useStyles(styles);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <HeaderLayout />
      </div>
      <div className={cx('content')}>{children}</div>
      <div className={cx('footer')}>
        <FooterLayout />
      </div>
    </div>
  );
};
