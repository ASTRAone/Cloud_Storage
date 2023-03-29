import { Disk } from './components/Disk';
import { AuthPage } from './pages/AuthPage';
import { DISK_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from './utility/contants';

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Element: AuthPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Element: AuthPage,
  },
];

export const privateRoutes = [
  {
    path: DISK_ROUTE,
    Element: Disk,
  },
];
