import React, { ReactNode } from 'react';
import { components, OptionProps } from 'react-select';

import { useStyles } from '@hooks/useStyles';

import { TextShorter } from '@components/TextShorter';

import styles from './styles.module.scss';

type Props = OptionProps & {
  children?: ReactNode | Element;
};

export const Option: React.FC<Props> = ({ children, className, ...props }) => {
  const cx = useStyles(styles);
  const { isSelected, isFocused } = props;

  return (
    <div className={cx('optionContainer')}>
      <components.Option
        {...props}
        className={cx(className, 'option', { isSelected, isFocused })}
      >
        <TextShorter tooltip>{children}</TextShorter>
      </components.Option>
    </div>
  );
};
