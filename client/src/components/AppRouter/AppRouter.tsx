import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { NOT_FOUND_ROUTE } from '@utils/contants';

import { routes } from '@src/routes';

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
        element={<Navigate to={NOT_FOUND_ROUTE} />}
      />
    </Routes>
  );
};
