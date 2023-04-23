import React from 'react';
import { useTranslation } from 'react-i18next';

import { StorageService } from '@services/StorageService';

import { useStyles } from '@hooks/useStyles';

import { Popup } from '@components/Popup';
import { IconTypes } from '@components/icon/IconDictionary';
import { MenuItem } from '@components/MenuIteim';

import DefaultAvatar from '@assets/images/default-avatar.png';

import { useAppDispatch } from '@store/hooks';
import { userLogout } from '@store/auth/data';

import styles from './styles.module.scss';
type Props = {
  name?: string;
  email?: string;
  className?: string;
  src: string;
};

export type MenuItemType = {
  url: string;
  iconType: IconTypes;
  linkName: string;
};

const storageService = StorageService.getInstance();

export const MenuProfile: React.FC<Props> = ({ name, email, src }) => {
  const { t } = useTranslation();
  const dispath = useAppDispatch();
  const menu: Array<MenuItemType> = [
    { url: '/profile', iconType: 'profile', linkName: t('profileMenu.menu.account') },
    { url: '/mydisk', iconType: 'disk', linkName: t('profileMenu.menu.mydisk') },
    { url: '/settings', iconType: 'settings', linkName: t('profileMenu.menu.settings') },
    { url: '/logout', iconType: 'logout', linkName: t('profileMenu.menu.logout') },
  ];

  const logout = async () => {
    storageService.removeItem('Authorization');
    storageService.removeItem('activeTabLC');
    await dispath(userLogout()).unwrap();
  };

  // TODO добавить запрос на получение имени и аватарки
  const cx = useStyles(styles);
  return (
    <>
      <Popup
        trigger={
          <>
            <div className={cx('container')}>
              <div className={cx('half-circle')} />
              <img
                src={src || DefaultAvatar}
                alt="avatar"
                className={cx('avatar')}
              />
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
                <div
                  className={cx('item', iconType === 'logout' ? 'item-top-border' : '')}
                  key={index}
                >
                  <MenuItem
                    url={url}
                    iconType={iconType}
                    title={linkName}
                    className={cx('btn-link')}
                    onClick={url === '/logout' ? logout : undefined}
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
