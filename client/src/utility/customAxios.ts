import axios from 'axios'
import qs from 'qs'
import R from '../redux/resources/R';


/**
 * Задание базового URL и сериализация параметров
 * @type {AxiosInstance}
 */
export const customAxios = axios.create({
    baseURL: R.server.cloud,
    paramsSerializer: {
      encode: params => qs.stringify(params, { 'indices': false, arrayFormat: 'repeat' }),
    } 
});

/**
 * Добавление параметров конфигурации для запросов по умолчанию
 */
customAxios.interceptors.request.use((config) => {
    config.params = config.params || {};
    return config;
});

// customAxios.interceptors.request.use(request => {
//     console.log('Starting Request', JSON.stringify(request, null, 2))
//     return request
// })
//
// customAxios.interceptors.response.use(response => {
//     console.log('Response:', JSON.stringify(response, null, 2))
//     return response
// })

export const setAccessToken = (token: string) => {
    token && (customAxios.defaults.headers.common.Authorization = `Bearer ${token}`);
    !token && (delete customAxios.defaults.headers.common.Authorization);
};
