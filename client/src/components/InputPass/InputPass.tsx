import React, { useState } from 'react';

import { IconObject } from '@utils/common';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { Input, InputProps } from '@components/Input/Input';

import styles from './styles.module.scss';

export const InputPass: React.FC<InputProps> = ({ placeholder, error, actions = [], ...rest }) => {
  const cx = useStyles(styles);
  const [show, setShow] = useState(false);

  const toggleShowPass = () => setShow((prev) => !prev);

  const arrIcons: IconObject[] = [
    {
      icon: (
        <Icon
          onClick={toggleShowPass}
          type={show ? 'hide' : 'show'}
          className={cx('icon')}
        />
      ),
      align: 'right',
    },
    ...(actions as IconObject[]),
  ];

  return (
    <Input
      {...rest}
      error={error}
      type={show ? 'text' : 'password'}
      placeholder={placeholder}
      actions={arrIcons}
    />
  );
};
