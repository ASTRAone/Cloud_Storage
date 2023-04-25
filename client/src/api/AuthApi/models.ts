type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};
// TODO добавить src для аватарки
type AuthViewDTO = {
  id?: number;
  email?: string;
  name?: string;
  surname?: string;
  diskSpace?: number;
  usedSpace?: number;
  language?: string;
  country?: string;
  city?: string;
  phone?: string;
  biography?: string;
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
