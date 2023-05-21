import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { linkIcons, linkTitles } from '@utils/links';

import { StorageService } from '@services/StorageService';

import { useStyles } from '@hooks/useStyles';

import { IconTypes } from '@components/icon/IconDictionary';
import { PanelInfoUsed } from '@components/PanelInfoUsed';
import { Button } from '@components/Button';
import { Icon } from '@components/icon';

import { useAppSelector } from '@store/hooks';

import styles from './styles.module.scss';
import { SidePanelItem } from './SidePanelItem';

export type LinkTypes = 'dashboard' | 'files' | 'favorites' | 'shared' | 'pictures' | 'history';

export type MenuItemType = {
  link: LinkTypes;
  disabled?: boolean;
};

export const menu: Array<MenuItemType> = [
  { link: 'dashboard' },
  { link: 'files' },
  { link: 'favorites' },
  { link: 'shared' },
  { link: 'pictures' },
  { link: 'history' },
];

const storageService = StorageService.getInstance();

export const SidePanel: React.FC = () => {
  const cx = useStyles(styles);
  const { t } = useTranslation();
  const { settings } = useAppSelector((state) => state.settings.data);
  const isSettingHideMenuManually = settings.autoHideSidepanel;

  const [activeTab, setActiveTab] = useState<LinkTypes>(
    (storageService.getItem('activeTabLC') as LinkTypes) || menu[0].link,
  );
  const [open, setOpen] = useState<boolean>(
    (JSON.parse(storageService.getItem('openPanel') as string) as boolean) || false,
  );

  const handleToggleSidePanel = () => {
    const isOpenPanel = !open;
    storageService.setItem('openPanel', JSON.stringify(isOpenPanel));
    setOpen((prev: boolean) => !prev);
  };

  const handleChangeActiveTab = (tab: LinkTypes) => {
    storageService.setItem('activeTabLC', tab);
    setActiveTab(tab);
  };

  const handleOpenMenuAuto = () => {
    if (!isSettingHideMenuManually) {
      setOpen(true);
      storageService.setItem('openPanel', JSON.stringify(true));
    }
  };

  const handleCloseMenuAuto = () => {
    if (!isSettingHideMenuManually) {
      setOpen(false);
      storageService.setItem('openPanel', JSON.stringify(false));
    }
  };

  return (
    <aside
      className={cx('container', open ? 'open' : '')}
      onMouseEnter={handleOpenMenuAuto}
      onMouseLeave={handleCloseMenuAuto}
    >
      <nav className={cx('menu')}>
        {menu.map(({ link }) => {
          const iconType: IconTypes = linkIcons[link];
          const title = linkTitles[link];
          return (
            <SidePanelItem
              key={link}
              to={link}
              isActive={activeTab === link}
              iconType={iconType}
              title={title}
              setActiveTab={handleChangeActiveTab}
            />
          );
        })}
        <>
          <PanelInfoUsed className={cx('panel', !open ? 'hide' : '')} />
          <Button
            color="white"
            text={t('sidebar.mydisk.button.title')}
            classNameBtn={cx('btn', !open ? 'hide' : '')}
          />
        </>
        {settings.autoHideSidepanel && (
          <div
            className={cx('containerArrow')}
            onClick={handleToggleSidePanel}
          >
            <Icon
              type="arrow"
              className={cx('arrow', open ? 'open' : '')}
            />
          </div>
        )}
      </nav>
      <div className={cx(isSettingHideMenuManually ? 'arrow-bg' : '')} />
      <div className={cx('aside-bg-left')} />
      <div className={cx('aside-bg-right')} />
    </aside>
  );
};
