import { IRestService, RestService } from "../../services/RestService";

import { AuthResponse, AuthDTO, AuthRegDTO } from "./models";
class AuthApi {
  static restService: IRestService = RestService.getInstance();

  static autorization(data: AuthDTO) {
    const url = "auth/login";
    return this.restService.POST<AuthDTO, AuthResponse>(url, { data });
  }

  static registration(data: AuthRegDTO) {
    const url = "auth/registration";
    return this.restService.POST(url, { data });
  }

  static auth() {
    const url = "auth/auth";
    return this.restService.GET(url);
  }

  static logout() {
    const url = "auth/logout";
    return this.restService.GET(url);
  }
}

export { AuthApi };
