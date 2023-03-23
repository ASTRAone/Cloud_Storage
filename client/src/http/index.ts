import axios from "axios";
// import { AuthApi } from "../api/AuthApi";
// import { AUTH_HEADER } from "../utility/headers";

// const $api = axios.create({
//   withCredentials: true,
//   baseURL: process.env.REACT_APP_API_URL,
// });

// $api.interceptors.request.use((config) => {
//   config.headers.Authorization = localStorage.getItem(AUTH_HEADER);
//   return config;
// });

// $api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !error.config._isRetry) {
//       originalRequest._isRetry = true;
//     }
//     console.log(
//       "error.response.status",
//       error.response.status,
//       "error.config._isRetry",
//       error.config._isRetry
//     );

//     if (error.response.status === 403) {
//       console.log("ERROR 403");
//     }

//     if (error.response.status === 400) {
//       console.log("ERROR 400");
//     }

    
//     if (error.response.status === 401 && !originalRequest._isRetry) {
//       originalRequest._isRetry = true;
//       try {
//         const response = await AuthApi.refresh();
//         localStorage.setItem(
//           AUTH_HEADER,
//           `Bearer ${response.data.accessToken}`
//         );
//         return $api.request(originalRequest);
//       } catch (error) {
//         console.log({ error });
//       }
//     }

//     if (
//       error.response.status === 401 &&
//       originalRequest &&
//       originalRequest._isRetry
//     ) {
//       console.log("мы попалю сюда");
//       try {
//         localStorage.removeItem(AUTH_HEADER);
//       } catch (error) {
//         console.log({ error });
//       }
//     }

//     console.log("error.response", error.response);
//   }
// );

// export default $api;
