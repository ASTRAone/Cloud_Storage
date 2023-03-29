import axios from 'axios';
import { AUTH_HEADER } from '@utils/headers';

import { AuthApi } from '@api/AuthApi';

export const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

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
  },
);

$api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await AuthApi.refresh();
          const { accessToken } = rs.data;
          window.localStorage.setItem(AUTH_HEADER, accessToken);
          $api.defaults.headers.common[AUTH_HEADER] = accessToken;

          return $api(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  },
);
