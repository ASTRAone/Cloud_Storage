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

export const PopupLocalization: React.FC = () => {
  const cx = useStyles(styles);
  const { t, i18n } = useTranslation();
  const menu: Array<MenuItemType> = [
    { iconType: 'russian', name: t('language.russian'), lang: 'ru' },
    { iconType: 'english', name: t('language.english'), lang: 'en' },
  ];

  const changingLanguage = (lang: string) => {
    i18n.changeLanguage(lang == 'ru' ? 'ru' : 'en');
  };
  return (
    <>
      <Popup
        trigger={
          <>
            <div className={cx('localization')}>{t('language.lang')}</div>
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
                    button
                    iconType={iconType}
                    title={name}
                    className={cx('btns')}
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
