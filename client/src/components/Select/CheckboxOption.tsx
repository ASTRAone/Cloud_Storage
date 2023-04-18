import React from 'react';
import { components, OptionProps } from 'react-select';

import { Size } from '@utils/common';

import { useStyles } from '@hooks/useStyles';

// import { TextShorter } from '@components/TextShorter';

import styles from './styles.module.scss';
// import { SelectOption } from './Select';

type Props = OptionProps & {
  tooltip?: boolean;
  checkboxSize?: Extract<Size, 'lg' | 'md' | 'sm'>;
  hasTooltip?: boolean;
};

const CheckboxOption: React.FC<Props> = ({ ...props }) => {
  const cx = useStyles(styles);
  // const { isSelected, isFocused, setValue, getValue, isMulti } = props;
  // const { label } = props.data as SelectOption<unknown>;
  // const label = data.label as string;

  // const onChange = () => {
  //   // getValue always return array options, but single select should return one option
  //   const value = isMulti ? getValue() : getValue()?.[0];
  //   setValue(value, 'select-option');
  // };

  return (
    <div className={cx('optionContainer')}>
      <components.Option
        {...props}
        // className={cx(className, 'option', { isFocused })}
      >
        {/* <Checkbox
          disabled={props.isDisabled}
          checked={isSelected}
          onChange={onChange}
          size={checkboxSize}
          containerReverse
        >
          <div className={cx('optionWithIcon')}>
            <TextShorter tooltip={tooltip}>{label}</TextShorter>
          </div>
        </Checkbox> */}
      </components.Option>
    </div>
  );
};

export { CheckboxOption };
