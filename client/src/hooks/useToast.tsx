import { toast } from 'react-hot-toast';

import { ToastSuccess, ToastSuccessProps } from '@components/Toast/ToastSuccess';
import { ToastError, ToastErrorProps } from '@components/Toast/ToastError';
import { ToastClue, ToastClueProps } from '@components/Toast/ToastClue';
import { ToastLoading, ToastLoadingProps } from '@components/Toast/ToastLoading';

type ReturnValue = {
  success: (props: ToastSuccessProps) => void;
  error: (props: ToastErrorProps) => void;
  clue: (props: ToastClueProps) => void;
  loading: (props: ToastLoadingProps) => void;
};

export const useToast = (): ReturnValue => {
  const success = (props: ToastSuccessProps) => {
    toast.custom((tItem) => (
      <ToastSuccess
        {...props}
        toastItem={tItem}
      />
    ));
  };

  const error = (props: ToastErrorProps) => {
    toast.custom((tItem) => (
      <ToastError
        {...props}
        toastItem={tItem}
      />
    ));
  };

  const clue = (props: ToastClueProps) => {
    toast.custom((tItem) => (
      <ToastClue
        {...props}
        toastItem={tItem}
      />
    ));
  };

  const loading = (props: ToastLoadingProps) => {
    toast.custom((tItem) => (
      <ToastLoading
        {...props}
        toastItem={tItem}
      />
    ));
  };

  return { success, error, clue, loading };
};
