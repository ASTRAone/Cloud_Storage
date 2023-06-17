import React from 'react';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = React.ComponentPropsWithRef<'li'> & {
  danger?: boolean;
  disabled?: boolean;
  className?: string;
};

export const MenuItem: React.FC<Props> = ({ className, children, ...rest }) => {
  const cx = useStyles(styles);

  const itemClassNames = cx('menuItem', className);
  return (
    <>
      <li
        className={itemClassNames}
        {...rest}
      >
        {children}
      </li>
    </>
  );
};
