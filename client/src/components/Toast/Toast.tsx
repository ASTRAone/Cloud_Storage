import React from 'react';
import { Toaster, DefaultToastOptions, ToastPosition } from 'react-hot-toast';

type Props = {
  position?: ToastPosition;
  containerClassName?: string;
};

export const Toast: React.FC<Props> = ({ position = 'top-center', containerClassName }) => {
  const duration = 2500;
  const defaultToatOptions: DefaultToastOptions = {
    duration,
  };

  return (
    <Toaster
      toastOptions={defaultToatOptions}
      gutter={16}
      position={position}
      containerClassName={containerClassName}
    />
  );
};
