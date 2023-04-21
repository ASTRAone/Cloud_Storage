type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id?: number;
    email?: string;
    name?: string;
    surname?: string;
    diskSpace?: number;
    usedSpace?: number;
    isAuth?: boolean;
    language: string;
  };
};
// TODO добавить src для аватарки
type AuthViewDTO = {
  id?: number;
  email?: string;
  diskSpace?: number;
  usedSpace?: number;
  isAuth?: boolean;
  language: string;
  name?: string;
  surname?: string;
};

type AuthDTO = {
  email: string;
  password: string;
  language: string;
  name: string;
  surname: string;
};

type AuthRegDTO = {
  name: string;
  surname: string;
  email: string;
  password: string;
  language: string;
};

export type { AuthResponse, AuthDTO, AuthViewDTO, AuthRegDTO };
