import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import { SelectOption } from '@components/Select/Select';

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
  dirId: string;
  name: string;
}

export const mapToOption = <T, M = string>(
  value: T,
  label: string | number,
  meta?: M,
): SelectOption<T, M> => {
  return { label, value, meta };
};
