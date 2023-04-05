import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type TabVariant = 'underlined' | 'subtle' | 'checkbox';

type Props = {
  title?: string;
  type?: TabVariant;
  isActive?: boolean;
  changeTab?: () => void;
};

export const Tab: React.FC<Props> = ({
  title,
  type = 'underlined',
  isActive = false,
  changeTab = () => {},
}) => {
  const cx = useStyles(styles);
  return (
    <button
      className={cx('btn', type, isActive ? 'active' : '')}
      onClick={changeTab}
    >
      {title}
    </button>
  );
};
