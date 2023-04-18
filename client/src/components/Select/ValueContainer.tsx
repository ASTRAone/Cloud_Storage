import React from 'react';
import { components, ValueContainerProps } from 'react-select';

import { Size } from '@utils/common';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = ValueContainerProps & {
  size?: Extract<Size, 'sm' | 'md' | 'lg'>;
};

const ValueContainer: React.FC<Props> = ({ children, isDisabled, size, ...props }) => {
  const cx = useStyles(styles);
  return (
    <components.ValueContainer
      {...props}
      isDisabled={isDisabled}
      className={cx('valueContainer', [size], { isDisabled })}
    >
      {children}
    </components.ValueContainer>
  );
};

export { ValueContainer };
