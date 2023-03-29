import React from 'react';
import { useLocation } from 'react-router-dom';

import { LOGIN_ROUTE } from '@utils/contants';

import { LayoutAuth } from '@src/layout/LayoutAuth';

import { Auth } from '@components/Auth';
import { Registration } from '@components/Registration';

export const AuthPage: React.FC = () => {
  const location = useLocation();
  return <LayoutAuth>{location.pathname === LOGIN_ROUTE ? <Auth /> : <Registration />}</LayoutAuth>;
};
