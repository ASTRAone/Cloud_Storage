import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { routes } from '@src/routes';
import { LOGIN_ROUTE } from '@src/utility/contants';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {routes.map(({ path, Element }) => (
        <Route
          path={path}
          element={<Element />}
          key={path}
        />
      ))}
      <Route
        path="*"
        element={<Navigate to={LOGIN_ROUTE} />}
      />
    </Routes>
  );
};
