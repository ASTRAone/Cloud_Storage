import React from 'react';
import { useTranslation } from 'react-i18next';

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

export const MenuProfile: React.FC<Props> = ({ name, email }) => {
  const { t } = useTranslation();
  const menu: Array<MenuItemType> = [
    { url: '/profile', iconType: 'profile', linkName: t('profileMenu.menu.account') },
    { url: '/mydisk', iconType: 'disk', linkName: t('profileMenu.menu.mydisk') },
    { url: '/settings', iconType: 'settings', linkName: t('profileMenu.menu.settings') },
    { url: '/logout', iconType: 'logout', linkName: t('profileMenu.menu.logout') },
  ];

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
            {menu.map(({ url, iconType, linkName }, index) => {
              return (
                <div key={index}>
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
                </div>
              );
            })}
          </div>
        </div>
      </Popup>
    </>
  );
};
