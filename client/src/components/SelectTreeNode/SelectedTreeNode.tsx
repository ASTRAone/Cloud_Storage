import React from 'react';

import Tree, { TreeProps } from '@uiw/react-tree';

import { useStyles } from '@hooks/useStyles';
import { usePopupControls } from '@hooks/usePopupControls';

import { Icon } from '@components/icon';

import styles from './styles.module.scss';
import { SelectedTreeNodeItem } from './SelectedTreeNodeItem';

type Props = TreeProps & {
  loading?: boolean;
  value: (string | number | undefined)[];
  onChangeSelected: (value: (string | number | undefined)[]) => void;
};

const data = [
  {
    label: '1',
    key: '1',
    children: [
      {
        label: '2',
        key: '2',
        children: [{ label: '3', key: '3' }],
      },
      { label: '4', key: '4' },
      {
        label: '黄石市',
        key: '0-3-0',
        children: [{ label: '青山区', key: '0-3-1' }],
      },
    ],
  },
];

export const SelectTreeNode: React.FC<Props> = ({ value, onChangeSelected, ...rest }) => {
  const cx = useStyles(styles);
  const { isOpened, togglePopup } = usePopupControls();

  const handleRemoveSelected = (key: string | number | undefined) => {
    const newSelectedTree = value.filter((item) => item !== key);
    onChangeSelected(newSelectedTree);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('tree-select', { isOpened })}>
        {value.length > 0 ? (
          value.map((item, index) => (
            <SelectedTreeNodeItem
              key={index}
              item={item}
              onClick={() => handleRemoveSelected(item)}
            />
          ))
        ) : (
          <p className={cx('tree-select-pl')}>Filter</p>
        )}
        <Icon
          type="arrowDown"
          className={cx('icon', { isOpened })}
          onClick={togglePopup}
        />
      </div>

      {isOpened && (
        <div className={cx('menu')}>
          <Tree
            {...rest}
            data={data}
            className={cx('menu-content')}
            selectedKeys={value}
            onSelected={(key) => onChangeSelected(key)}
          />
        </div>
      )}
    </div>
  );
};
