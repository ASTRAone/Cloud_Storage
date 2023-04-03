import React from 'react';
import { useTranslation } from 'react-i18next';

import { useStyles } from '@hooks/useStyles';

import { Popup } from '@components/Popup';
import { IconTypes } from '@components/icon/IconDictionary';
import { MenuItem } from '@components/MenuIteim';

import styles from './styles.module.scss';

export type MenuItemType = {
  iconType: IconTypes;
  name: string;
  lang: string;
};
const menu: Array<MenuItemType> = [
  { iconType: 'russian', name: 'Russian', lang: 'ru' },
  { iconType: 'english', name: 'English', lang: 'en' },
];

export const PopupLocalization: React.FC = () => {
  const cx = useStyles(styles);
  const { t, i18n } = useTranslation();

  const changingLanguage = (lang: string) => {
    i18n.changeLanguage(lang == 'ru' ? 'ru' : 'en');
  };
  return (
    <>
      <Popup
        trigger={
          <>
            <div className={cx('localization')}>{t('language')}</div>
          </>
        }
        position="right bottom"
        on="click"
      >
        <div className={cx('dropdown-language')}>
          <div className={cx('dropdown-content-language')}>
            {menu.map(({ iconType, name, lang }) => {
              return (
                <div
                  key={name}
                  className={cx('item')}
                  onClick={() => changingLanguage(lang)}
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
