import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = {
  filter?: string;
  str?: string;
};

export const Hightlight: React.FC<Props> = ({ filter, str }): any => {
  const cx = useStyles(styles);

  if (!str) return null;
  if (!filter) return <span className={cx('hightlight-str')}>{str}</span>;

  const regexp = new RegExp(filter, 'ig');
  const matchValue = str.match(regexp);

  if (matchValue) {
    return str.split(regexp).map((s, index, array) => {
      if (index < array.length - 1) {
        const c = matchValue.shift();
        return (
          <span key={index}>
            {s}
            <span className={cx('hightlight-copy')}>{c}</span>
          </span>
        );
      }
      return (
        <span
          className={cx('hightlight-str')}
          key={index}
        >
          {s}
        </span>
      );
    });
  }
  return <span className={cx('hightlight-str')}>{str}</span>;
};
