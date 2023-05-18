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
} from './utility/contants';
import { ProfileUserPage } from './pages/ProfileUserPage';
import { StartPage } from './pages/PageStart';
import { FilesPage } from './pages/FilesPage';
import { PageNotFound } from './pages/PageNotFound';
import { FavoritesPage } from './pages/FavoritesPage';

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
    path: NOT_FOUND_ROUTE,
    Element: PageNotFound,
  },
];
