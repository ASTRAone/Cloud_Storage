import { Auth } from "./components/Auth";
import { Disk } from "./components/Disk";
import { Registration } from "./components/Registration";
import { DISK_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utility/contants";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Element: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Element: Registration,
  },
];

export const privateRoutes = [
  {
    path: DISK_ROUTE,
    Element: Disk
  }
]