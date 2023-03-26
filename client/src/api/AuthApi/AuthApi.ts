import $api from "../../hooks/useAuth";
import { IRestService, RestService } from "../../services/RestService";
import { ApiResultResponse } from "../../utility/common";

import { AuthResponse, AuthDTO, AuthRegDTO, AuthViewDTO } from "./models";
class AuthApi {
  static restService: IRestService = RestService.getInstance();

  static autorization(data: AuthDTO) {
    const url = "login";
    return $api.post<AuthDTO, ApiResultResponse<AuthResponse>>(url, {
      ...data,
    });
  }

  static registration(data: AuthRegDTO) {
    const url = "registration";
    return $api.post<AuthRegDTO>(url, { ...data });
  }

  static refresh() {
    const url = "refresh";
    return $api.get<AuthResponse>(url);
  }

  static reload() {
    const url = "user";
    return $api.get<AuthViewDTO>(url);
  }

  static logout() {
    const url = "logout";
    return $api.post(url);
  }
}

export { AuthApi };
