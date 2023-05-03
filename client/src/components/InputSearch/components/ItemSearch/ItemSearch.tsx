import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';
import { Hightlight } from '../Hightlight';

type Props = {
  filter?: string;
  str?: string;
  onChange: (value: string) => void;
};

export const ItemSearch: React.FC<Props> = ({ filter, str, onChange }) => {
  const cx = useStyles(styles);
  if (!filter) return null;

  const handleChangeSearch = (value: string | undefined) => {
    if (value) onChange(value);
  };

  return (
    <div
      className={cx('item')}
      onClick={() => handleChangeSearch(str)}
    >
      <Hightlight
        filter={filter}
        str={str}
      />
    </div>
  );
};
