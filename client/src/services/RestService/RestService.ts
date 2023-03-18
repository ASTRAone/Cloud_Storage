import axios, { AxiosResponse } from 'axios';
import qs from "qs";

import { IRestService, HttpClient, RequestOptions } from './IRestService';

class RestService implements IRestService {
  private readonly httpClient: HttpClient;
  private static instance: RestService;

  private constructor() {
    this.httpClient = axios.create({
      timeout: 25_000,
      withCredentials: true,
    });
  }

  public static getInstance(): RestService {
    if (!RestService.instance) {
      RestService.instance = new RestService();
    }

    return RestService.instance;
  }

  private async request<TRequest, TResponse>(url: string, options: RequestOptions<TRequest>) {
    return this.httpClient.request<TResponse>({ url, ...options });
  }

  addBaseURL(baseURL: string) {
    this.httpClient.defaults.baseURL = baseURL;
  }

  addInterceptors(interceptor: (response: AxiosResponse) => void) {
    this.httpClient.interceptors.response.use(undefined, function (error) {
      interceptor(error.response);
      return Promise.reject(error);
    });
  }

  addDefaultHeader(key: string, value: string) {
    this.httpClient.defaults.headers.common[key] = value;
  }

  removeDefaultHeader(key: string) {
    delete this.httpClient.defaults.headers.common[key];
  }

  GET<TRequest, TResponse>(url: string, options?: RequestOptions<TRequest>) {
    return this.request<TRequest, TResponse>(url, { ...options, method: 'GET' });
  }

  POST<TRequest, TResponse>(url: string, options?: RequestOptions<TRequest>) {
    return this.request<TRequest, TResponse>(url, { ...options, method: 'post' });
  }

  PUT<TRequest, TResponse>(url: string, options?: RequestOptions<TRequest>) {
    return this.request<TRequest, TResponse>(url, { ...options, method: 'PUT' });
  }

  DELETE<TRequest, TResponse>(url: string, options?: RequestOptions<TRequest>) {
    return this.request<TRequest, TResponse>(url, { ...options, method: 'DELETE' });
  }
}

export { RestService };
