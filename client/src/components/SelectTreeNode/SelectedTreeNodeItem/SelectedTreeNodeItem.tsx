import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';

import styles from './styles.module.scss';

type Props = {
  item: string | number | undefined;
  onClick?: () => void;
};

export const SelectedTreeNodeItem: React.FC<Props> = ({ item, onClick = () => {} }) => {
  const cx = useStyles(styles);
  return (
    <div className={cx('container')}>
      <span className={cx('text')}>{item}</span>
      <Icon
        type="close"
        className={cx('icon')}
        onClick={onClick}
      />
    </div>
  );
};
