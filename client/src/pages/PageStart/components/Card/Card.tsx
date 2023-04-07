import React from 'react';

import { useStyles } from '@hooks/useStyles';

import StarImage from '@assets/images/star.png';

import styles from './styles.module.scss';

type Props = {
  title?: string;
  text?: string;
};

export const Card: React.FC<Props> = ({ title, text }) => {
  const cx = useStyles(styles);
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <img
          src={StarImage}
          alt="star"
        />
        <p className={cx('title')}>{title}</p>
      </div>
      <p className={cx('text')}>{text}</p>
    </div>
  );
};
