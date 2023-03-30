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

export const linkIcons: Record<LinkTypes, IconTypes> = {
  dashboard: 'dashboard',
  shared: 'shared',
  files: 'stockholm',
  pictures: 'heart',
  favorites: 'shape',
  request: 'request',
};
