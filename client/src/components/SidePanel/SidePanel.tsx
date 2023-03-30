import React, { useState } from 'react';

import { linkIcons, linkTitles } from '@utils/links';

import { useStyles } from '@hooks/useStyles';

import { IconTypes } from '@components/icon/IconDictionary';
import { PanelInfoUsed } from '@components/PanelInfoUsed';
import { Button } from '@components/Button';

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
  const [activeTab, setActiveTab] = useState(localStorage.getItem('tab') || menu[0].link);

  const handleChangeActiveTab = (tab: LinkTypes) => {
    localStorage.setItem('tab', tab);
    setActiveTab(tab);
  };

  return (
    <aside className={cx('container')}>
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
        <PanelInfoUsed />
        <Button
          color="white"
          text="Add more space"
          className={cx('btn')}
        />
      </nav>
    </aside>
  );
};
