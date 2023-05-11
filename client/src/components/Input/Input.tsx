import React, { cloneElement } from 'react';

import { FormError, IconObject } from '@utils/common';

import { useStyles } from '@hooks/useStyles';

import { Loader } from '@components/Loader';

import styles from './styles.module.scss';

type Props = Partial<React.ComponentPropsWithRef<'input'>> & {
  error?: FormError;
  actions?: Array<IconObject>;
  label?: string;
  full?: boolean;
  className?: string;
  classNameLabel?: string;
  classNameContent?: string;
  variant?: 'blue' | 'dark';
  isUpperCase?: boolean;
  errorText?: string;
  loading?: boolean;
};

export const Input: React.FC<Props> = ({
  type = 'text',
  placeholder = '',
  value,
  error,
  actions,
  label,
  className,
  classNameLabel,
  classNameContent,
  variant,
  isUpperCase = true,
  full = false,
  errorText,
  loading,
  ...rest
}) => {
  const cx = useStyles(styles);
  const isError = !!error;
  const actionsLeft: Array<JSX.Element> = [];
  const actionsRight: Array<JSX.Element> = [];

  if (actions) {
    actions.forEach((elem) => {
      const icon = cloneElement(elem.icon, {
        key: elem.icon.type,
        ...elem.icon.props,
        className: cx(elem.icon.props.className, 'icon'),
      });
      elem.align === 'left' ? actionsLeft.push(icon) : actionsRight.push(icon);
    });
  }

  return (
    <div className={cx('container', className, full ? 'full' : '')}>
      {label && (
        <label className={cx('label', classNameLabel, isUpperCase ? 'upperCase' : '')}>
          {label}
        </label>
      )}
      <div
        className={cx(
          errorText ? 'error' : '',
          'content',
          variant,
          classNameContent,
          isError ? 'error' : '',
        )}
      >
        {actionsLeft}
        <div className={cx('controller-input')}>
          <input
            {...rest}
            type={type}
            className={cx('input')}
            value={value}
            placeholder={placeholder}
          />
        </div>
        {actionsRight}
        {loading && <Loader className={cx('icon')} />}
      </div>
      <span className={cx('error')}>{errorText}</span>
    </div>
  );
};

export type { Props as InputProps };
