import React from 'react';

import { useAuth } from '@hooks/useAuth';
import { useInitialization } from '@hooks/useInitialization';

import { AppRouter } from '@components/AppRouter';
import { Toast } from '@components/Toast/Toast';

export const App: React.FC = () => {
  useInitialization();
  useAuth();

  return (
    <>
      <AppRouter />
      <Toast position="top-right" />
    </>
  );
};
