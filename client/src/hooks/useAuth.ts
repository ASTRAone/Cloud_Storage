import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { AuthApi } from "../api/AuthApi";

import { AUTH_HEADER } from "../utility/headers";
import { LOGIN_ROUTE } from "../utility/contants";
import { useAppDispatch } from "../store/hooks";
import { userLogout } from "../store/auth/data";

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

const useAuth = () => {
  const token = localStorage.getItem(AUTH_HEADER);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token !== null) {
      $api.defaults.headers.common[AUTH_HEADER] = token;
    }
  }, [token]);

  $api.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem(AUTH_HEADER);
    return config;
  });

  $api.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403) {
        // TODO реализовать всплывающие сообщения
        console.log("ERROR 403");
      }

      if (error.response.status === 400) {
        // TODO реализовать всплывающие сообщения
        console.log("ERROR 400");
      }

      if (error.response.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
          const response = await AuthApi.refresh();
          localStorage.setItem(
            AUTH_HEADER,
            `Bearer ${response.data.accessToken}`
          );
          return $api.request(originalRequest);
        } catch (error) {
          console.log({ error });
        }
      }

      if (
        error.response.status === 401 &&
        originalRequest &&
        originalRequest._isRetry
      ) {
        try {
          localStorage.removeItem(AUTH_HEADER);
        } catch (error) {
          console.log({ error });
        }
      }
    }
  );
};

export default $api;
export { useAuth };
