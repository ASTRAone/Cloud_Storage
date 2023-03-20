type AuthResponse = {
  token: string;
  user: {
    id?: number;
    email?: string;
    diskSpace?: number;
    usedSpace?: number;
    isAuth?: boolean;
    loading?: boolean;
  };
};

type AuthViewDTO = {
  id?: number;
  email?: string;
  diskSpace?: number;
  usedSpace?: number;
  isAuth?: boolean;
  loading?: boolean;
};

type AuthDTO = {
  email: string;
  password: string;
};

type AuthRegDTO = {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export type { AuthResponse, AuthDTO, AuthViewDTO, AuthRegDTO };
