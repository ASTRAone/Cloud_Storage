import React, { useState } from 'react';

import { useStyles } from '@hooks/useStyles';

import { TabList } from '@components/Tab/TabList';
import { Tab } from '@components/Tab';
import { TabPanel } from '@components/Tab/TabPanel';
import { TextShorter } from '@components/TextShorter';

import { useAppSelector } from '@store/hooks';
import { getUserData } from '@store/auth/data';

import styles from './styles.module.scss';
import { CellInfo, SettingsProfileUser } from './components';
import { AvatarUser } from './components';
import { EditProfileForm } from './components/EditProfileForm';

const TABS = ['Editing Profile', 'Settings', 'Premium'];

export const ProfileUser: React.FC = () => {
  const cx = useStyles(styles);
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const { userData, statusUpdateProfile } = useAppSelector(getUserData);
  const { name, surname, email, diskSpace, usedSpace } = userData;

  const userName = name ?? '-';
  const userSurname = surname ?? '-';

  return (
    <div className={cx('page')}>
      <div className={cx('header')}>
        <TextShorter
          tooltip
          className={cx('title')}
        >
          <>{userName + userSurname}</>
        </TextShorter>
        <TextShorter
          tooltip
          className={cx('text')}
        >
          <>{email ?? '-'}</>
        </TextShorter>
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
              value={usedSpace}
              isGb
              type="blue"
            />

            <div style={{ width: 192, height: 125 }} />

            {/* TODO перевести в gb */}
            <CellInfo
              title="disk spased"
              value={diskSpace}
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
              <EditProfileForm
                data={userData}
                isLoading={statusUpdateProfile === 'loading'}
              />
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
