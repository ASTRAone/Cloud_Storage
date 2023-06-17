import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  SELECTED_LANGUAGE_KEY,
  HIDE_STATUS_ONLINE,
  ORDER_WHORES,
  SIDEPANEL_AUTO_HIDE,
  ALLOW_NOTIFICATIONS,
} from '@utils/localStorageKeys';
import { Language } from '@utils/common';
import { DEFAULT_LANGUAGE } from '@utils/contants';

import { StorageService } from '@services/StorageService';

import { RootState } from '@store/root';

const storageService = StorageService.getInstance();

type State = {
  settings: {
    [SIDEPANEL_AUTO_HIDE]: boolean;
    [SELECTED_LANGUAGE_KEY]: Language;
    [HIDE_STATUS_ONLINE]: boolean;
    [ORDER_WHORES]: boolean;
    [ALLOW_NOTIFICATIONS]: boolean;
  };
};

const initialState: State = {
  settings: {
    [SIDEPANEL_AUTO_HIDE]: storageService.getItem(SIDEPANEL_AUTO_HIDE) ?? false,
    [SELECTED_LANGUAGE_KEY]: storageService.getItem(SELECTED_LANGUAGE_KEY) ?? DEFAULT_LANGUAGE,
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
    languageChange: (state, action) => {
      state.settings[SELECTED_LANGUAGE_KEY] = action.payload;
    },
  },
});

const selectSelf = (state: RootState) => state.settings.data;

export const isSidebarAutoHide = createSelector(
  selectSelf,
  ({ settings }) => settings[SIDEPANEL_AUTO_HIDE],
);
export const getSelectedLanguage = createSelector(
  selectSelf,
  ({ settings }) => settings[SELECTED_LANGUAGE_KEY],
);

export const { sidepanelHideToggle, languageChange } = userSettingsSlice.actions;
export default userSettingsSlice.reducer;
