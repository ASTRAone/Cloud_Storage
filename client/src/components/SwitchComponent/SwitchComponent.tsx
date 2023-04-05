import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = Partial<React.ComponentPropsWithRef<'input'>>;

export const SwitchComponent: React.FC<Props> = ({ ...rest }) => {
  const cx = useStyles(styles);
  return (
    <input
      {...rest}
      type="checkbox"
      className={cx('input')}
    />
  );
};
