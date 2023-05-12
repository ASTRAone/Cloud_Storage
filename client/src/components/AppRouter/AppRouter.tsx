import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { NOT_FOUND_ROUTE } from '@utils/contants';

import { routes } from '@src/routes';

import { StorageService } from '@services/StorageService';

const storageService = StorageService.getInstance();

export const AppRouter: React.FC = () => {
  const isPreviewChecked: boolean =
    (JSON.parse(storageService.getItem('previewCheck') as string) as boolean) || false;

  console.log('isPreviewChecked', isPreviewChecked);

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
