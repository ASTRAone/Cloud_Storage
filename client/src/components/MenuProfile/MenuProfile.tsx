import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { StorageService } from '@services/StorageService';

import { useStyles } from '@hooks/useStyles';

import { Popup } from '@components/Popup';
import { IconTypes } from '@components/icon/IconDictionary';
import { MenuItem } from '@components/MenuIteim';
import { TextShorter } from '@components/TextShorter';
import { Icon } from '@components/icon';

import DefaultAvatar from '@assets/images/default-avatar.png';

import { useAppDispatch } from '@store/hooks';
import { userLogout } from '@store/auth/data';

import styles from './styles.module.scss';

const MENU: Array<MenuItemType> = [
  { url: 'profile', iconType: 'profile', linkName: 'profileMenu.menu.account', type: 'link' },
  {
    url: 'mydisk',
    iconType: 'disk',
    linkName: 'profileMenu.menu.mydisk',
    type: 'link',
    disabled: true,
  },
  {
    url: 'settings',
    iconType: 'settings',
    linkName: 'profileMenu.menu.settings',
    type: 'link',
    disabled: true,
  },
  { url: 'logout', linkName: 'profileMenu.menu.logout', type: 'logout' },
];

type Props = {
  name?: string;
  email?: string;
  className?: string;
  src: string;
};

export type MenuItemType = {
  url: string;
  iconType?: IconTypes;
  linkName: string;
  type: 'link' | 'logout';
  disabled?: boolean;
};

// TODO добавить запрос на получение имени и аватарки
const storageService = StorageService.getInstance();

export const MenuProfile: React.FC<Props> = ({ name, email, src }) => {
  const cx = useStyles(styles);
  const { t } = useTranslation();
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    storageService.removeItem('Authorization');
    storageService.removeItem('activeTabLC');
    await dispath(userLogout()).unwrap();
  };

  const onClick = (type: 'link' | 'logout', url: string) => {
    if (type === 'link' && url) {
      storageService.setItem('activeTabLC', url);
      navigate(`/${url}`);
    }
    if (type === 'logout') {
      logout();
    }
  };

  const subitemsNode = MENU.map(({ iconType, url, linkName, type, disabled }, index) => {
    const isLastItem = index === MENU.length - 1;
    const active = storageService.getItem('activeTabLC') === url;

    return (
      <MenuItem
        key={index}
        className={cx('contentMenu', { disabled, active }, isLastItem ? 'last' : '')}
        onClick={() => onClick(type, url)}
      >
        {iconType && (
          <Icon
            type={iconType}
            className={cx('iconMenu')}
          />
        )}

        <p className={cx('menuItemText')}>{t(linkName)}</p>
      </MenuItem>
    );
  });
  return (
    <>
      <Popup
        classNamePrefix="popup-profile"
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
                <TextShorter
                  tooltip
                  position={['left top']}
                  className={cx('name')}
                >
                  <>{name}</>
                </TextShorter>
                <TextShorter
                  tooltip
                  position={['left top']}
                  className={cx('email')}
                >
                  <>{email}</>
                </TextShorter>
              </div>
            </div>
          </>
        }
        position="bottom right"
        on="click"
      >
        <div className={cx('dropdown')}>{subitemsNode}</div>
      </Popup>
    </>
  );
};
