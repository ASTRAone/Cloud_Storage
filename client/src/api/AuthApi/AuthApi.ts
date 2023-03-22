import { IRestService, RestService } from "../../services/RestService";

import { AuthResponse, AuthDTO, AuthRegDTO } from "./models";
class AuthApi {
  static restService: IRestService = RestService.getInstance();

  static autorization(data: AuthDTO) {
    const url = "login";
    return this.restService.POST<AuthDTO, AuthResponse>(url, { data });
  }

  static registration(data: AuthRegDTO) {
    const url = "registration";
    return this.restService.POST(url, { data });
  }

  static auth() {
    const url = "refresh";
    return this.restService.GET<AuthResponse>(url);
  }

  static logout() {
    const url = "logout";
    return this.restService.POST(url);
  }
}

export { AuthApi };
