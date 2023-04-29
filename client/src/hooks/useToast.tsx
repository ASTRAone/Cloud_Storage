import { Theme, ToastOptions, ToastPosition, toast } from 'react-toastify';

import { ToastSuccess, ToastSuccessProps } from '@components/Toast/ToastSuccess';
import { ToastError, ToastErrorProps } from '@components/Toast/ToastError';
import { ToastClue, ToastClueProps } from '@components/Toast/ToastClue';
import { ToastLoading, ToastLoadingProps } from '@components/Toast/ToastLoading';

type ReturnValue = {
  success: (props: ToastSuccessProps & ToastOptions) => void;
  error: (props: ToastErrorProps & ToastOptions) => void;
  clue: (props: ToastClueProps & ToastOptions) => void;
  loading: (props: ToastLoadingProps & ToastOptions) => void;
};

const DEFAULT_POSITION: ToastPosition = 'top-right';
const DEFAULT_THEME: Theme = 'light';

export const useToast = (): ReturnValue => {
  const success = (props: ToastSuccessProps & ToastOptions) => {
    const {
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      closeButton,
      draggable,
      progress,
      theme,
    } = props;
    toast(<ToastSuccess {...props} />, {
      position: position ?? DEFAULT_POSITION,
      autoClose: autoClose ?? 2500,
      hideProgressBar: hideProgressBar ?? true,
      closeOnClick: closeOnClick ?? true,
      pauseOnHover: pauseOnHover ?? true,
      closeButton: closeButton ?? false,
      draggable: draggable ?? true,
      progress: progress ?? undefined,
      theme: theme ?? DEFAULT_THEME,
    });
  };

  const error = (props: ToastErrorProps & ToastOptions) => {
    toast((tItem) => (
      <ToastError
        {...props}
        toastItem={tItem}
      />
    ));
  };

  const clue = (props: ToastClueProps & ToastOptions) => {
    toast((tItem) => (
      <ToastClue
        {...props}
        toastItem={tItem}
      />
    ));
  };

  const loading = (props: ToastLoadingProps & ToastOptions) => {
    toast((tItem) => (
      <ToastLoading
        {...props}
        toastItem={tItem}
      />
    ));
  };

  return { success, error, clue, loading };
};
