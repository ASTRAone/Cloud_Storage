import React, { cloneElement } from 'react';

import { FormError, IconObject } from '@utils/common';

import { useStyles } from '@hooks/useStyles';

import { Form } from '@components/Form';

import styles from './styles.module.scss';

type Props = Partial<React.ComponentPropsWithRef<'input'>> & {
  error?: FormError;
  actions?: Array<IconObject>;
  full?: boolean;
  header?: boolean;
};

export const InputFilter: React.FC<Props> = ({
  type = 'filter',
  placeholder = '',
  value,
  error,
  actions,
  header = false,
  full = false,
  ...rest
}) => {
  const cx = useStyles(styles);
  const isError = !!error;
  const actionsLeft: Array<JSX.Element> = [];
  const actionsRight: Array<JSX.Element> = [];

  // TODO: Дополнить логику в зависимости от бека
  const onSubmitFilter = async (data: unknown) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
    <Form
      onSubmit={onSubmitFilter}
      className={cx('container', full ? 'full' : '', header ? 'header' : '')}
    >
      <div className={cx('content', isError ? 'error' : '')}>
        {actionsLeft}
        <div className={cx('controller-input')}>
          <input
            type={type}
            className={cx('input')}
            value={value}
            placeholder={placeholder}
            {...rest}
          />
        </div>
        {actionsRight}
      </div>
    </Form>
  );
};

export type { Props as InputProps };
