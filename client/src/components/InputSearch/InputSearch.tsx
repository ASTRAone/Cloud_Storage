import React, { useEffect, useRef, useState } from 'react';

import { useStyles } from '@hooks/useStyles';
import { useClearTimeout } from '@hooks/useClearTimeout';

import { Input, InputProps } from '@components/Input/Input';
import { SelectOption } from '@components/Select/Select';

import styles from './styles.module.scss';
import { ItemSearch } from './components/ItemSearch';

type Props = InputProps & {
  dataPath: SelectOption<string>[];
  search: string | undefined;
  onChangeSearch: (value: string) => void;
};

export const InputSearch: React.FC<Props> = ({
  search,
  onChangeSearch,
  error,
  placeholder,
  actions,
  dataPath,
  classNameContent,
  ...rest
}) => {
  const cx = useStyles(styles);
  const { refTimeout, clearTm } = useClearTimeout();
  const [filteredData, setFilteredData] = useState<SelectOption<string>[]>([]);
  const [isInFocus, setIsInFocus] = useState<boolean>(false);
  const rootEl = useRef<HTMLDivElement | null>(null);

  const onInputFocus = () => {
    setIsInFocus(true);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) =>
      (rootEl.current && rootEl.current.contains(e.target as Node)) || setIsInFocus(false);
    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    clearTm();
    refTimeout.current = setTimeout(() => {
      const value = search?.length
        ? dataPath.filter((item) => {
            const matchValue = search.toLowerCase();
            if (item.label.toString().includes(matchValue)) return true;
            return false;
          })
        : [];
      setFilteredData(value);
    }, 500);
  }, [search]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChangeSearch(value);
  };

  return (
    <div
      className={cx('container')}
      ref={rootEl}
    >
      <Input
        {...rest}
        error={error}
        value={search}
        onChange={handleChangeSearch}
        type="text"
        placeholder={placeholder}
        actions={actions}
        onFocus={onInputFocus}
        classNameContent={cx(
          classNameContent,
          filteredData.length > 0 && isInFocus ? 'open' : 'close',
        )}
      />
      {filteredData.length > 0 && isInFocus && (
        <div className={cx('content')}>
          {filteredData.map((item) => (
            <ItemSearch
              key={item.value}
              str={item.label as string}
              filter={search}
              onChange={onChangeSearch}
            />
          ))}
        </div>
      )}
    </div>
  );
};
