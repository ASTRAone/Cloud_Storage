import { CSSProperties, ForwardedRef, forwardRef, ReactNode, useMemo } from 'react';
import ReactSelect, { GroupBase, Props as SelectProps, StylesConfig } from 'react-select';
import { SelectComponents } from 'react-select/dist/declarations/src/components';

import { Size } from '@utils/common';

import { useStyles } from '@hooks/useStyles';

import { Loader } from '@components/Loader';

import styles from './styles.module.scss';
import { Option } from './Option';
import { ValueContainer } from './ValueContainer';

type SelectOption<T, M = string> = {
  label: string | number;
  value: T;
  meta?: M;
};

type SelectGroupOption<T, M = string> = {
  label?: string | number;
  options: SelectOption<T, M>[];
  meta?: M;
};

type CustomProps<T> = {
  description?: ReactNode;
  descriptionOnTop?: boolean;
  size?: Extract<Size, 'sm' | 'md' | 'lg'>;
  errorText?: string;
  isError?: boolean;
  hover?: boolean;
  caption?: ReactNode;
  options: SelectOption<T>[] | SelectGroupOption<T>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: any) => void;
  hideFocusedPlaceholder?: boolean;
  withoutBorder?: boolean;
  containerClassName?: string;
  noOptionsText?: string;
  onContainerClick?: (event: React.MouseEvent) => void;
  hint?: string;
  menuStyles?: CSSProperties;
  portal?: boolean | HTMLElement;
  maxMenuHeight?: number;
};

type Props<T = string> = CustomProps<T> & Omit<SelectProps, keyof CustomProps<T>>;

const cx = useStyles(styles);

const DEFAULT_PORTAL_ROOT = document.querySelector('body');

const SelectInner = <T,>(
  {
    size = 'lg',
    caption,
    hint,
    description,
    descriptionOnTop,
    isError,
    errorText,
    className,
    hover,
    components,
    styles,
    withoutBorder,
    containerClassName,
    hideSelectedOptions = false,
    backspaceRemovesValue = false,
    noOptionsText,
    isMulti = false,
    menuStyles,
    portal,
    isClearable = false,
    isDisabled = false,
    hideFocusedPlaceholder = false,
    onContainerClick,
    options,
    maxMenuHeight,
    ...restProps
  }: Props<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: ForwardedRef<any>,
) => {
  const newOptions = options?.map((item) => {
    return { ...item, label: item?.label || '-' };
  });
  const customStyles: StylesConfig = useMemo(
    () => ({
      // TODO доделать
      control: (baseStyles) => ({
        ...baseStyles,
        borderColor: isError ? 'red' : '#3F82B7',
        borderRadius: 13,
        backgroundColor: 'transparent',
      }),
      singleValue: (baseStyle) => ({
        ...baseStyle,
        color: '#004B75',
      }),
      menu: (provided) => ({
        ...provided,
        ...menuStyles,
        marginTop: 0,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 4,
        paddingLeft: 4,
        background: 'white',
      }),
      menuList: (provided) => ({
        ...provided,
        paddingTop: 0,
        paddingBottom: 0,
        maxHeight: maxMenuHeight ?? 215,
      }),
      multiValueRemove: () => ({ display: 'none' }),
      indicatorSeparator: () => ({ display: 'none' }),
      input: (provided) => ({
        ...provided,
        margin: 0,
        padding: 0,
      }),
      placeholder: (provided, state) => ({
        ...provided,
        color: '#c0c0c0',
        display: state.isFocused && hideFocusedPlaceholder ? 'none' : undefined,
      }),
      menuPortal: (provided) => ({
        ...provided,
        zIndex: 1000,
        background: 'none',
      }),
      valueContainer: (provided) => ({
        ...provided,
        display: 'flex',
        backgroundColor: 'transparent',
        gap: 12,
      }),
      ...styles,
    }),
    [hideFocusedPlaceholder, styles],
  );

  const innerComponents: Partial<SelectComponents<unknown, boolean, GroupBase<unknown>>> = useMemo(
    () => ({
      // DropdownIndicator: () => (
      //   <Icon
      //     type="chevron-down"
      //     size="md"
      //     className={cx('icon', { isDisabled })}
      //   />
      // ),
      Option: ({ children, ...props }) => <Option {...props}>{children}</Option>,
      ValueContainer: ({ children, ...props }) => (
        <ValueContainer
          {...props}
          isDisabled={isDisabled}
          size={size}
        >
          {children}
        </ValueContainer>
      ),
      LoadingIndicator: () => <Loader className={cx('icon', 'loader', { isDisabled })} />,
      // MultiValue: ({ children, ...props }) => <MultiValue {...props}>{children}</MultiValue>,
      ...components,
    }),
    [isDisabled, noOptionsText, size, withoutBorder, isError, hover, components],
  );

  const descriptionNode = description && (
    <div className={cx('description', { top: descriptionOnTop })}>{description}</div>
  );

  return (
    <div className={containerClassName}>
      {caption && (
        <div className={cx({ caption: true, isDisabled }, 'captionTooltip')}>{caption}</div>
      )}
      {/* TODO подумать над descriptionNode */}
      {descriptionOnTop && descriptionNode}

      <div onClick={onContainerClick}>
        <ReactSelect
          options={newOptions}
          ref={ref}
          styles={customStyles}
          className={cx('select', className)}
          isDisabled={isDisabled}
          components={innerComponents}
          hideSelectedOptions={hideSelectedOptions}
          backspaceRemovesValue={backspaceRemovesValue}
          isClearable={isClearable}
          isMulti={isMulti}
          menuPlacement="auto"
          menuPortalTarget={typeof portal === 'boolean' ? DEFAULT_PORTAL_ROOT : portal}
          {...restProps}
        />
      </div>

      {errorText && <div className={cx({ error: true })}>{errorText}</div>}
      {!descriptionOnTop && descriptionNode}
    </div>
  );
};

const Select = forwardRef(SelectInner) as <T>(
  props: Props<T> & { ref?: ForwardedRef<unknown> },
) => ReturnType<typeof SelectInner>;

export { Select };
export type { SelectOption, SelectGroupOption, Props as SelectProps };
