import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Popup } from '@components/Popup';
import { IconTypes } from '@components/icon/IconDictionary';
import { MenuItem } from '@components/MenuIteim';

import styles from './styles.module.scss';

type Props = { name: string; email: string; className?: string };

export type MenuItemType = {
  url: string;
  iconType: IconTypes;
  linkName: string;
};
const menu: Array<MenuItemType> = [
  { url: '/account', iconType: 'profile', linkName: 'Account' },
  { url: '/mydisk', iconType: 'disk', linkName: 'MyDisk' },
  { url: '/settings', iconType: 'settings', linkName: 'Settings' },
  { url: '/logout', iconType: 'logout', linkName: 'Logout' },
];

export const MenuProfile: React.FC<Props> = ({ name, email }) => {
  const cx = useStyles(styles);
  return (
    <>
      <Popup
        trigger={
          <>
            <div className={cx('container')}>
              <div className={cx('half-circle')} />
              <div className={cx('avatar')} />
              <div className={cx('information')}>
                <div className={cx('name')}>{name}</div>
                <div className={cx('email')}>{email}</div>
              </div>
            </div>
          </>
        }
        position="left bottom"
        on="click"
      >
        <div className={cx('dropdown')}>
          <div className={cx('dropdown-content')}>
            {menu.map(({ url, iconType, linkName }) => {
              return (
                <>
                  <div
                    key={url}
                    className={cx('item', iconType == 'logout' ? 'item-top-border' : '')}
                  >
                    <MenuItem
                      url={url}
                      iconType={iconType}
                      name={linkName}
                      className={cx('btn-link')}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </Popup>
    </>
  );
};
