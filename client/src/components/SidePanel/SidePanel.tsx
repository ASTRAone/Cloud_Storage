import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { linkIcons, linkTitles } from '@utils/links';

import { useStyles } from '@hooks/useStyles';

import { IconTypes } from '@components/icon/IconDictionary';
import { PanelInfoUsed } from '@components/PanelInfoUsed';
import { Button } from '@components/Button';
import { Icon } from '@components/icon';

import styles from './styles.module.scss';
import { SidePanelItem } from './SidePanelItem';

export type LinkTypes = 'dashboard' | 'files' | 'favorites' | 'shared' | 'pictures' | 'request';

export type MenuItemType = {
  link: LinkTypes;
  disabled?: boolean;
};

const menu: Array<MenuItemType> = [
  { link: 'dashboard' },
  { link: 'files' },
  { link: 'favorites' },
  { link: 'shared' },
  { link: 'pictures' },
  { link: 'request' },
];

export const SidePanel: React.FC = () => {
  const cx = useStyles(styles);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<LinkTypes>(
    (localStorage.getItem('activeTabLC') as LinkTypes) || menu[0].link,
  );
  const [open, setOpen] = useState<boolean>(
    (JSON.parse(localStorage.getItem('openPanel') as string) as boolean) || false,
  );

  const handleToggleSidePanel = () => {
    const isOpenPanel = !open;
    localStorage.setItem('openPanel', JSON.stringify(isOpenPanel));
    setOpen((prev: boolean) => !prev);
  };

  const handleChangeActiveTab = (tab: LinkTypes) => {
    localStorage.setItem('activeTabLC', tab);
    setActiveTab(tab);
  };

  return (
    <aside className={cx('container', open ? 'open' : '')}>
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

        <div
          className={cx('containerArrow')}
          onClick={handleToggleSidePanel}
        >
          <Icon
            type="arrow"
            className={cx('arrow', open ? 'open' : '')}
          />
        </div>
      </nav>
      <div className={cx('arrow-bg')} />
      <div className={cx('aside-bg-left')} />
      <div className={cx('aside-bg-right')} />
    </aside>
  );
};
