import { AxiosError } from 'axios';

import { ApiError } from './common';

class ErrorUtils {
  static FORM_KEY_SEPARATOR = '|>';

  static handleApiError(error: unknown, defaultErrorMsg = ''): string {
    if (!isApiError(error)) {
      return defaultErrorMsg;
    }

    const errorData = error.response?.data;
    return (Array.isArray(errorData) ? errorData[0] : errorData?.message) ?? defaultErrorMsg;
  }

  static handleFormError(message = '', mapper?: (value: string) => string): string[] {
    const messageArray = message.split(ErrorUtils.FORM_KEY_SEPARATOR);

    return mapper ? messageArray.map(mapper) : messageArray;
  }
}

export { ErrorUtils };

export const isApiError = (error: unknown): error is AxiosError<ApiError> => {
  return !!(error as AxiosError<ApiError>)?.response?.data;
};
