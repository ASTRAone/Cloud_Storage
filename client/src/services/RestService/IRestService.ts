import { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';

type HttpClient = Axios;
type RequestOptions<T> = AxiosRequestConfig<T>;
type Response<T> = AxiosResponse<T>;

interface IRestService {
  GET<TResponse>(url: string, options?: RequestOptions<unknown>): Promise<Response<TResponse>>;
  POST<TRequest, TResponse>(
    url: string,
    options?: RequestOptions<TRequest>,
  ): Promise<Response<TResponse>>;
  PUT<TRequest, TResponse>(
    url: string,
    options?: RequestOptions<TRequest>,
  ): Promise<Response<TResponse>>;
  DELETE<TRequest, TResponse>(
    url: string,
    options?: RequestOptions<TRequest>,
  ): Promise<Response<TResponse>>;

  addDefaultHeader(key: string, value: unknown): void;
  removeDefaultHeader(key: string): void;
  addInterceptors(interceptor: () => void): void;
}

export type { IRestService, RequestOptions, HttpClient, Response };
