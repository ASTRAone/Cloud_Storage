export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
export type RequestStatus = 'idle' | 'loading' | 'failed';
export type UUID = string;
export type TypeFile = 'dir' | 'file';
export type ApiResultResponse<T> = {
  status: number;
  statusText: string;
  data: T;
};
