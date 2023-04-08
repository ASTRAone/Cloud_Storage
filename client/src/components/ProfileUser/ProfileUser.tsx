import React, { useState } from 'react';

import { useStyles } from '@hooks/useStyles';

import { TabList } from '@components/Tab/TabList';
import { Tab } from '@components/Tab';
import { TabPanel } from '@components/Tab/TabPanel';

import styles from './styles.module.scss';
import { CellInfo, SettingsProfileUser } from './components';
import { AvatarUser } from './components';
import { EditProfileForm } from './components/EditProfileForm';

const TABS = ['Editing Profile', 'Settings', 'Premium'];

// TODO доделать форму авторизации по label
// TODO поправить все цвета

export const ProfileUser: React.FC = () => {
  const cx = useStyles(styles);
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className={cx('page')}>
      <div className={cx('header')}>
        <h3 className={cx('title')}>vlados panov</h3>
        <p className={cx('text')}>Russia, Kostroma</p>
      </div>
      <div className={cx('container')}>
        <div className={cx('content-left')}>
          <AvatarUser />

          <div className={cx('content-info')}>
            <CellInfo
              title="summary files"
              value={156}
            />
            <CellInfo
              title="disk used"
              value={0.2}
              isGb
              type="blue"
            />

            <div style={{ width: 192, height: 125 }} />

            <CellInfo
              title="disk spased"
              value={20}
            />
            <CellInfo
              title="shared users with"
              value={4}
            />
          </div>
        </div>

        <div className={cx('content-right')}>
          <TabList>
            {TABS.map((item, index) => (
              <Tab
                title={item}
                isActive={item === activeTab}
                changeTab={() => setActiveTab(item)}
                key={index}
              />
            ))}
          </TabList>
          <div className={cx('panel')}>
            <TabPanel
              value="Editing Profile"
              currentValue={activeTab}
            >
              <EditProfileForm />
            </TabPanel>
            <TabPanel
              value="Settings"
              currentValue={activeTab}
            >
              <SettingsProfileUser />
            </TabPanel>
            <TabPanel
              value="Premium"
              currentValue={activeTab}
            >
              <div>3</div>
            </TabPanel>
          </div>
        </div>
        <div className={cx('circle')} />
      </div>
    </div>
  );
};
