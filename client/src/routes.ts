import { Auth } from "./components/Auth";
import { Registration } from "./components/Registration";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utility/contants";

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
