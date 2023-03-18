type AuthResponse = {
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

export type { AuthResponse, AuthDTO };
