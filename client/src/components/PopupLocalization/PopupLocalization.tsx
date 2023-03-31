import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Popup } from '@components/Popup';
import { IconTypes } from '@components/icon/IconDictionary';
import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';

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
                <>
                  <div
                    key={name}
                    className={cx('item')}
                  >
                    <Icon
                      type={iconType}
                      className={cx('icon')}
                    />
                    <ButtonLink
                      text={name}
                      to={name}
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
