import axios from 'axios';
import { AUTH_HEADER } from '@utils/headers';
import { LOGIN_ROUTE } from '@utils/contants';

import { StorageService } from '@services/StorageService';

const storageService = StorageService.getInstance();

export const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use(
  (config) => {
    const token = storageService.getItem(AUTH_HEADER);
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

    if (originalConfig.url !== LOGIN_ROUTE) {
      // if (err.response.status == 401 && originalConfig && originalConfig._retry === undefined) {
      //   storageService.removeItem(AUTH_HEADER);
      // }

      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          // const rs = await AuthApi.refresh();

          // const { accessToken } = rs.data;
          // $api.defaults.headers.common[AUTH_HEADER] = `Bearer ${accessToken}`;
          storageService.removeItem(AUTH_HEADER);

          return $api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  },
);

// TODO вынести все отдельно
// $api.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     // const navigate = useNavigate();
//     console.log('originalConfig', originalConfig);
//     console.log('err.response', err.response);

//     if (err.response) {
//       // Access Token was expired
//       if (err.response.status === 401) {
//         originalConfig._retry = true;

//         try {
//           // const rs = await AuthApi.refresh();
//           // const { accessToken } = rs.data;
//           // localStorage.setItem(AUTH_HEADER, `Bearer ${accessToken}`);
//           // $api.defaults.headers.common[AUTH_HEADER] = `Bearer ${accessToken}`;
//           storageService.removeItem(AUTH_HEADER);
//           // navigate(LOGIN_ROUTE);

//           // return $api(originalConfig);
//         } catch (_error: any) {
//           if (_error.response && _error.response.data) {
//             return Promise.reject(_error.response.data);
//           }

//           return Promise.reject(_error);
//         }
//       }

//       if (err.response.status === 403 && err.response.data) {
//         return Promise.reject(err.response.data);
//       }
//     }

//     return Promise.reject(err);
//   },
// );
