import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
export type RequestStatus = 'idle' | 'loading' | 'failed';
export type UUID = string;
export type TypeFile = 'dir' | 'file';
export type ApiResultResponse<T> = {
  status: number;
  statusText: string;
  data: T;
};
export type FormError = boolean | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
export type IconObject = {
  icon: JSX.Element;
  align: 'left' | 'right';
};

export interface BreadCrumbStack {
  name: string;
  dirId: string;
}
