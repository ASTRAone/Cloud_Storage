import { IRestService, RestService } from '../../services/RestService';

import { AuthResponse, AuthDTO } from './models';
class AuthApi {
  static restService: IRestService = RestService.getInstance();

  static autorization(data: AuthDTO) {
    const url = 'auth/login';
    return this.restService.POST<AuthDTO, AuthResponse>(url, { data });
  }

  static registration() {
    const url = '/auth/password/logout';
    return this.restService.POST(url);
  }

  static logout() {
    const url = '/';
    return this.restService.GET(url);
  }
}

export { AuthApi };
