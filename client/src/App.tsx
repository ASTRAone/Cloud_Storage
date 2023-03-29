import React from 'react';

import { useAuth } from '@hooks/useAuth';

import { AppRouter } from '@components/AppRouter';

export const App: React.FC = () => {
  useAuth();
  return <AppRouter />;
};
