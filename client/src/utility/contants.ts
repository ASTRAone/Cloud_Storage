import { PropsFolders } from '@components/FoldersBrightRaw/FoldersBrightRaw';

import { FoldersViewed, Language } from './common';

export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const CLOUD_ROUTE = '/dashboard';
export const PROFILE_USER_ROUTE = '/profile';
export const START_ROUTE = '/';
export const ALL_FILES_ROUTE = '/files';
export const FAVORITES_ROUTE = '/favorites';
export const SHARED_ROUTE = '/shared';
export const PICTURES_ROUTE = '/pictures';
export const HISTORY_ROUTE = '/history';
export const NOT_FOUND_ROUTE = '404';

export enum ColorFolder {
  music = '#3F82B7',
  documents = '#2FE6C8',
  films = '#FDBC64',
  images = '#FF7F5C',
}

export const mounths = [
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
];

export const FOLDERS_VIEWED: FoldersViewed[] = [
  {
    type: 'list',
    title: 'list',
  },
  {
    type: 'tile',
    title: 'TILES',
  },
  {
    type: 'big-tile',
    title: 'BIG TILES',
  },
];

export const DEFAULT_VIEW_FOLDERS = 'list';
export const DEFAULT_LANGUAGE: Language = 'ru-RU';

export const ANIMATION_TIME = 300;

export const FOLDERS: Array<PropsFolders> = [
  { key: 6, type: 'music', title: 'Music', files: '122', gb: '54' },
  { key: 2, type: 'images', title: 'Images', files: '41', gb: '622' },
  { key: 3, type: 'films', title: 'Films', files: '41', gb: '2' },
  { key: 4, type: 'documents', title: 'Documents', files: '121', gb: '252' },
  { key: 5, type: 'music', title: 'Music', files: '5', gb: '232' },
  { key: 1, type: 'films', title: 'Films', files: '15', gb: '532' },
  { key: 7, type: 'music', title: 'Music', files: '122', gb: '54' },
  { key: 8, type: 'images', title: 'Images', files: '41', gb: '622' },
  { key: 9, type: 'films', title: 'Films', files: '41', gb: '2' },
  { key: 10, type: 'documents', title: 'Documents', files: '121', gb: '252' },
  { key: 11, type: 'music', title: 'Music', files: '5', gb: '232' },
  { key: 12, type: 'films', title: 'Films', files: '15', gb: '532' },
];
