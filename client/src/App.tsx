import React from 'react';

import { useAuth } from '@hooks/useAuth';
import { useInitialization } from '@hooks/useInitialization';

import { AppRouter } from '@components/AppRouter';

export const App: React.FC = () => {
  useInitialization();
  useAuth();
  return <AppRouter />;
};
