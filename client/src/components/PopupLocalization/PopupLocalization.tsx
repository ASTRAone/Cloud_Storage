import React from 'react';
import { useTranslation } from 'react-i18next';

import { Language } from '@utils/common';

import { useStyles } from '@hooks/useStyles';
import { usePopupControls } from '@hooks/usePopupControls';

import { Popup } from '@components/Popup';
import { IconTypes } from '@components/icon/IconDictionary';
import { MenuItem } from '@components/MenuIteim';
import { Icon } from '@components/icon';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getSelectedLanguage, languageChange } from '@store/settings/data';

import styles from './styles.module.scss';

export type MenuItemType = {
  iconType: IconTypes;
  name: string;
  lang: Language;
};

const labelDictionary: Record<Language, string> = {
  'ru-RU': 'RU',
  'en-US': 'EN',
};

export const PopupLocalization: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isOpened, openPopup, closePopup } = usePopupControls();
  const currentLanguage = useAppSelector(getSelectedLanguage);

  const MENU: Array<MenuItemType> = [
    { iconType: 'russian', name: 'language.russian', lang: 'ru-RU' },
    { iconType: 'english', name: 'language.english', lang: 'en-US' },
  ];

  const changingLanguage = (lang: Language) => {
    if (lang !== currentLanguage) {
      dispatch(languageChange(lang));
    }
  };

  const subitemsNode = MENU.map(({ iconType, name, lang }, index) => {
    const active = lang === currentLanguage;
    return (
      <MenuItem
        key={index}
        className={cx('contentMenu', { active })}
        onClick={() => changingLanguage(lang)}
      >
        <Icon
          type={iconType}
          className={cx('iconMenu')}
        />
        <p className={cx('menuItemText')}>{t(name)}</p>
      </MenuItem>
    );
  });

  return (
    <>
      <Popup
        open={isOpened}
        onClose={closePopup}
        onOpen={openPopup}
        trigger={
          <>
            <div className={cx('localization')}>{labelDictionary[currentLanguage]}</div>
          </>
        }
        position="bottom center"
        on="click"
      >
        <div className={cx('dropdownLanguage')}>{subitemsNode}</div>
      </Popup>
    </>
  );
};
