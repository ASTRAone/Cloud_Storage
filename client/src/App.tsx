import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '@hooks/useAuth';
import { useInitialization } from '@hooks/useInitialization';

import { AppRouter } from '@components/AppRouter';
import { Toast } from '@components/Toast/Toast';

export const App: React.FC = () => {
  const location = useLocation();
  useInitialization();
  useAuth();

  useEffect(() => {
    const body = document.body;
    if (location.pathname === '/') {
      body.style.overflowY = 'auto';
    } else body.style.overflowY = 'hidden';
  }, [location]);

  return (
    <>
      <AppRouter />
      <Toast position="top-right" />
    </>
  );
};
