import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
  filter?: string;
  str?: string;
};

// TODO исправить any в returnValues

export const Hightlight: React.FC<Props> = ({ filter, str }): any => {
  const cx = useStyles(styles);

  if (!str) return null;
  if (!filter) return <span className={cx('hightlight-str')}>{str}</span>;

  const regexp = new RegExp(filter, 'ig');
  const matchValue = str.match(regexp);

  if (matchValue) {
    return str.split(regexp).map((strSplit, index, array) => {
      if (index < array.length - 1) {
        const strLater = matchValue.shift();
        return (
          <span key={strLater}>
            {strSplit}
            <span className={cx('hightlight-copy')}>{strLater}</span>
          </span>
        );
      }
      return (
        <span
          className={cx('hightlight-str')}
          key={strSplit}
        >
          {strSplit}
        </span>
      );
    });
  }
  return <span className={cx('hightlight-str')}>{str}</span>;
};
