import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { IconTypes } from '@components/icon/IconDictionary';
import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';

import styles from './styles.module.scss';

type Props = {
  auth?: boolean;
};

export type MenuItemType = {
  url: string;
  iconType: IconTypes;
  linkName: string;
};

const menu: Array<MenuItemType> = [
  { url: '/account', iconType: 'user', linkName: 'Account' },
  { url: '/mydisk', iconType: 'disk', linkName: 'MyDisk' },
  { url: '/settings', iconType: 'settings', linkName: 'Settings' },
  { url: '/logout', iconType: 'logout', linkName: 'Logout' },
];

export const DropDownMenu: React.FC<Props> = () => {
  const cx = useStyles(styles);
  // TODO: use t
  // const { t } = useTranslation();
  return (
    <div className={cx('container')}>
      <div className={cx('dropdown-content')}>
        {menu.map(({ url, iconType, linkName }) => {
          return (
            <div
              key={url}
              className={cx('item')}
            >
              <Icon
                type={iconType}
                className={cx('icon')}
              />
              <ButtonLink
                text={linkName}
                to={url}
                className={cx('btn-link')}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
