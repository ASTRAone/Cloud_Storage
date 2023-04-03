import { IconTypes } from '@components/icon/IconDictionary';

type LinkTypes = 'dashboard' | 'files' | 'favorites' | 'shared' | 'pictures' | 'request';

export const linkTitles: Record<LinkTypes, string> = {
  dashboard: 'Dashboard',
  files: 'All files',
  favorites: 'Favorites',
  shared: 'Shared',
  pictures: 'Pictures',
  request: 'Request',
};

// dashboard: t('menu.leftMenu.dashboard'),
// files: t('menu.leftMenu.allFiles'),
// favorites: t('menu.leftMenu.favorites'),
// shared: t('menu.leftMenu.shared'),
// pictures: t('menu.leftMenu.pictures'),
// request: t('menu.leftMenu.request'),

export const linkIcons: Record<LinkTypes, IconTypes> = {
  dashboard: 'dashboard',
  shared: 'shared',
  files: 'stockholm',
  pictures: 'heart',
  favorites: 'shape',
  request: 'request',
};
