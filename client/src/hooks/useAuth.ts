import axios from "axios";
import { useEffect } from "react";
import { AuthApi } from "../api/AuthApi";
import { dropState } from "../store/auth/data";
import { useAppDispatch } from "../store/hooks";

import { AUTH_HEADER } from "../utility/headers";

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

const useAuth = () => {
  const token = localStorage.getItem(AUTH_HEADER);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token !== null) {
      $api.defaults.headers.common[AUTH_HEADER] = token;
    }
  }, [token]);

  $api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(AUTH_HEADER);
      if (token) {
        config.headers[AUTH_HEADER] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  function createAxiosResponseInterceptor() {
    const interceptor = $api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }
        $api.interceptors.response.eject(interceptor);

        return AuthApi.refresh()
          .then((response) => {
            localStorage.setItem(
              AUTH_HEADER,
              `Bearer ${response.data.accessToken}`
            );
            error.response.config.headers[AUTH_HEADER] =
              "Bearer " + response.data.accessToken;
            return $api(error.response.config);
          })
          .catch((error2) => {
            dispatch(dropState());
            localStorage.removeItem(AUTH_HEADER);
            return Promise.reject(error2);
          })
          .finally(createAxiosResponseInterceptor);
      }
    );
  }
  createAxiosResponseInterceptor();
};

export default $api;
export { useAuth };
