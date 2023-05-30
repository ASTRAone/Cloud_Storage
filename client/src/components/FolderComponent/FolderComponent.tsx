import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { dictionaryColorFolder } from '@components/icon/Icon';
import { Popup } from '@components/Popup';
import { MenuItem } from '@components/MenuIteim';

import styles from './styles.module.scss';

type Props = {
  type: string;
  title: string;
  files: string;
  gb: string;
};

export type MenuItemType = {
  name: string;
};

const MENU: Array<MenuItemType> = [
  { name: 'Open' },
  { name: 'Change' },
  { name: 'Move' },
  { name: 'Delete' },
];

export const FolderComponent: React.FC<Props> = ({ type, title, files, gb }) => {
  const cx = useStyles(styles);
  const color = dictionaryColorFolder[type];

  const subitemsNode = MENU.map(({ name }, index) => (
    <div
      key={index}
      className={cx('item')}
    >
      <MenuItem
        button
        title={name}
        className={cx('btn')}
      />
    </div>
  ));

  return (
    <div className={cx('container')}>
      <div className={cx('box', type)}>
        <div className={cx('box-title')}>
          <Icon
            type="bigfolder"
            className={cx('icon')}
            style={{ color }}
            size="xl"
          />
          <Popup
            trigger={
              <div className={cx('block-dots')}>
                <div className={cx('dots')} />
              </div>
            }
            position="left center"
            on="click"
          >
            <div className={cx('dropdown-context')}>
              <div className={cx('dropdown-content')}>{subitemsNode}</div>
            </div>
          </Popup>
        </div>
        <div className={cx('title')}>{title}</div>
        <div className={cx('box-information-disk')}>
          <div className={cx('sub-text')}>{files} files</div>
          <div className={cx('sub-text')}>{gb} GB</div>
        </div>
      </div>
    </div>
  );
};
