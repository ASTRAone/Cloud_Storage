import React from 'react';

import { FormError } from '@utils/common';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type Props = Partial<React.ComponentPropsWithRef<'textarea'>> & {
  label?: string;
  placeholder?: string;
  classNameLabel?: string;
  variant?: 'dark' | 'blue';
  error?: FormError;
};

// TODO добавить ошибку в стили
export const Textarea: React.FC<Props> = ({
  label,
  variant = 'dark',
  placeholder,
  error,
  classNameLabel,
  ...rest
}) => {
  const cx = useStyles(styles);
  const isError = !!error;
  return (
    <div className={cx('container')}>
      {label && <label className={cx('label', classNameLabel, variant)}>{label}</label>}
      <textarea
        className={cx('textarea', variant, isError ? 'error' : '')}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};
