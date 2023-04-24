import React, { cloneElement } from 'react';

import { FormError, IconObject } from '@utils/common';

import { useStyles } from '@hooks/useStyles';

import { Form } from '@components/Form';

import styles from './styles.module.scss';

type Props = Partial<React.ComponentPropsWithRef<'input'>> & {
  error?: FormError;
  actions?: Array<IconObject>;
  full?: boolean;
  // onSearchChange?: (value: string) => void;
};

export const InputSearch: React.FC<Props> = ({
  type = 'search',
  placeholder = '',
  value,
  error,
  actions,
  full = false,
  ...rest
}) => {
  const cx = useStyles(styles);
  const isError = !!error;
  const actionsLeft: Array<JSX.Element> = [];
  const actionsRight: Array<JSX.Element> = [];

  // TODO: Дополнить логику в зависимости от бека
  // const onSubmitSearch = async (data: any) => {
  //   console.log('data ', data);
  //   try {
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onSearchChange = async (data: unknown) => {
  //   console.log('omfg');
  //   try {=
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      // onSubmit={onSubmitSearch}
      className={cx('container', full ? 'full' : '')}
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
