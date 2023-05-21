import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  ALLOW_AUTOMATICALLY_CHANGE_LANGUAGE,
  HIDE_STATUS_ONLINE,
  ORDER_WHORES,
  SIDEPANEL_AUTO_HIDE,
  ALLOW_NOTIFICATIONS,
} from '@utils/localStorageKeys';

import { StorageService } from '@services/StorageService';

import { RootState } from '@store/root';

const storageService = StorageService.getInstance();

type State = {
  settings: {
    [SIDEPANEL_AUTO_HIDE]: boolean;
    [ALLOW_AUTOMATICALLY_CHANGE_LANGUAGE]: boolean;
    [HIDE_STATUS_ONLINE]: boolean;
    [ORDER_WHORES]: boolean;
    [ALLOW_NOTIFICATIONS]: boolean;
  };
};

const initialState: State = {
  settings: {
    [SIDEPANEL_AUTO_HIDE]: storageService.getItem(SIDEPANEL_AUTO_HIDE) ?? false,
    [ALLOW_AUTOMATICALLY_CHANGE_LANGUAGE]:
      storageService.getItem(ALLOW_AUTOMATICALLY_CHANGE_LANGUAGE) ?? false,
    [HIDE_STATUS_ONLINE]: storageService.getItem(HIDE_STATUS_ONLINE) ?? false,
    [ORDER_WHORES]: storageService.getItem(ORDER_WHORES) ?? false,
    [ALLOW_NOTIFICATIONS]: storageService.getItem(ALLOW_NOTIFICATIONS) ?? false,
  },
};

const userSettingsSlice = createSlice({
  name: 'userSettingsSlice',
  initialState,
  reducers: {
    dropState: () => initialState,
    sidepanelHideToggle: (state) => {
      state.settings[SIDEPANEL_AUTO_HIDE] = !state.settings[SIDEPANEL_AUTO_HIDE];
    },
  },
});

const selectSelf = (state: RootState) => state.settings.data;

export const isSidebarAutoHide = createSelector(
  selectSelf,
  ({ settings }) => settings[SIDEPANEL_AUTO_HIDE],
);

export const { sidepanelHideToggle } = userSettingsSlice.actions;

// eslint-disable-next-line prettier/prettier

export default userSettingsSlice.reducer;
