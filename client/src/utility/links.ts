// import { useTranslation } from 'react-i18next';

import { IconTypes } from '@components/icon/IconDictionary';

type LinkTypes = 'dashboard' | 'files' | 'favorites' | 'shared' | 'pictures' | 'history';

// const { t } = useTranslation();

export const linkTitles: Record<LinkTypes, string> = {
  dashboard: 'Dashboard',
  files: 'All files',
  favorites: 'Favorites',
  shared: 'Shared',
  pictures: 'Pictures',
  history: 'History',
};

export const linkIcons: Record<LinkTypes, IconTypes> = {
  dashboard: 'dashboard',
  shared: 'shared',
  files: 'stockholm',
  pictures: 'heart',
  favorites: 'shape',
  history: 'history',
};
