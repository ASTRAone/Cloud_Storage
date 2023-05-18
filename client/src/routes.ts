import { AuthPage } from './pages/AuthPage';
import { CloudPage } from './pages/CloudPage';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  CLOUD_ROUTE,
  PROFILE_USER_ROUTE,
  ALL_FILES_ROUTE,
  START_ROUTE,
  NOT_FOUND_ROUTE,
  FAVORITES_ROUTE,
  SHARED_ROUTE,
  PICTURES_ROUTE,
  HISTORY_ROUTE,
} from './utility/contants';
import { ProfileUserPage } from './pages/ProfileUserPage';
import { StartPage } from './pages/PageStart';
import { FilesPage } from './pages/FilesPage';
import { PageNotFound } from './pages/PageNotFound';
import { FavoritesPage } from './pages/FavoritesPage';
import { SharedPage } from './pages/SharedPage';
import { PicturesPage } from './pages/PicturesPage';
import { HistoryPage } from './pages/HistoryPage';

export const routes = [
  {
    path: LOGIN_ROUTE,
    Element: AuthPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Element: AuthPage,
  },
  {
    path: CLOUD_ROUTE,
    Element: CloudPage,
  },
  {
    path: ALL_FILES_ROUTE,
    Element: FilesPage,
  },
  {
    path: PROFILE_USER_ROUTE,
    Element: ProfileUserPage,
  },
  {
    path: START_ROUTE,
    Element: StartPage,
  },
  {
    path: FAVORITES_ROUTE,
    Element: FavoritesPage,
  },
  {
    path: SHARED_ROUTE,
    Element: SharedPage,
  },
  {
    path: PICTURES_ROUTE,
    Element: PicturesPage,
  },
  {
    path: HISTORY_ROUTE,
    Element: HistoryPage,
  },
  {
    path: NOT_FOUND_ROUTE,
    Element: PageNotFound,
  },
];
