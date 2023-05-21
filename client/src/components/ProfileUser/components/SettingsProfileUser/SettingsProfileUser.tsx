import React from 'react';

import { SIDEPANEL_AUTO_HIDE } from '@utils/localStorageKeys';

import { StorageService } from '@services/StorageService';

import { useAppSelector, useAppDispatch } from '@store/hooks';
import { sidepanelHideToggle } from '@store/settings/data';

import { SettingsProfileUserView } from './SettingsProfileUser.view';

const storageService = StorageService.getInstance();

export const SettingsProfileUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector((state) => state.settings.data);

  const handleChangeHideSidepanel = (value: boolean) => {
    dispatch(sidepanelHideToggle());
    storageService.setItem(SIDEPANEL_AUTO_HIDE, value);
  };

  return (
    <SettingsProfileUserView
      onChangeHideMenu={handleChangeHideSidepanel}
      hideMenuValue={settings.autoHideSidepanel}
    />
  );
};
