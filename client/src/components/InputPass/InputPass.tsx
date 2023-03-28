import React, { useState } from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { Input, InputProps } from '@components/Input/Input';

import styles from './styles.module.scss';

export const InputPass: React.FC<InputProps> = ({ placeholder, error, ...rest }) => {
  const cx = useStyles(styles);
  const [show, setShow] = useState(false);

  const showPass = () => setShow(true);
  const hidePass = () => setShow(false);

  return (
    <div className={cx('container')}>
      <Input
        error={error}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        actions={[
          {
            icon: (
              <Icon
                onClick={show ? hidePass : showPass}
                type={show ? 'hide' : 'show'}
                className={cx('icon')}
              />
            ),
            align: 'right',
          },
        ]}
        {...rest}
      />
    </div>
  );
};
