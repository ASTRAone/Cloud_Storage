// import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { AUTH_HEADER } from '@utils/headers';
// import { LOGIN_ROUTE } from '@utils/contants';

// import { AuthApi } from '@api/AuthApi';

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

// TODO вынести все отдельно
$api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    // const navigate = useNavigate();
    console.log('originalConfig', originalConfig);
    console.log('err.response', err.response);

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401) {
        originalConfig._retry = true;

        try {
          // const rs = await AuthApi.refresh();
          // const { accessToken } = rs.data;
          // localStorage.setItem(AUTH_HEADER, `Bearer ${accessToken}`);
          // $api.defaults.headers.common[AUTH_HEADER] = `Bearer ${accessToken}`;
          localStorage.removeItem(AUTH_HEADER);
          // navigate(LOGIN_ROUTE);

          // return $api(originalConfig);
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
