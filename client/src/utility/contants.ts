import { FoldersViewed } from './common';

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
  music = '#327BD1',
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
