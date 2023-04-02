import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Popup } from '@components/Popup';
import { IconTypes } from '@components/icon/IconDictionary';
import { MenuItem } from '@components/MenuIteim';

import styles from './styles.module.scss';

export type MenuItemType = {
  iconType: IconTypes;
  name: string;
};
const menu: Array<MenuItemType> = [
  { iconType: 'russian', name: 'Russian' },
  { iconType: 'english', name: 'English' },
];

export const PopupLocalization: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <>
      <Popup
        trigger={
          <>
            <div className={cx('localization')}>EN</div>
          </>
        }
        position="right bottom"
        on="click"
      >
        <div className={cx('dropdown-language')}>
          <div className={cx('dropdown-content-language')}>
            {menu.map(({ iconType, name }) => {
              return (
                <div
                  key={name}
                  className={cx('item')}
                >
                  <MenuItem
                    noLink
                    iconType={iconType}
                    name={name}
                    className={cx('btn')}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Popup>
    </>
  );
};
