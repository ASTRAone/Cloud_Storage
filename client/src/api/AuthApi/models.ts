type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id?: number;
    email?: string;
    diskSpace?: number;
    usedSpace?: number;
    isAuth?: boolean;
    language: string;
  };
};

type AuthViewDTO = {
  id?: number;
  email?: string;
  diskSpace?: number;
  usedSpace?: number;
  isAuth?: boolean;
  language: string;
};

type AuthDTO = {
  email: string;
  password: string;
  language: string;
};

type AuthRegDTO = {
  name: string;
  surname: string;
  email: string;
  password: string;
  language: string;
};

export type { AuthResponse, AuthDTO, AuthViewDTO, AuthRegDTO };
