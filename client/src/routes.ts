import { AuthPage } from './pages/AuthPage';
import { CloudPage } from './pages/CloudPage';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, CLOUD_ROUTE } from './utility/contants';

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
];
