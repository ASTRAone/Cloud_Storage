import React from 'react';

import { LayoutPage } from '@src/layout/LayoutPage';

import { Files } from '@components/Files';
// Перенести в компонент получение файлов
export const FilesPage: React.FC = () => {
  return (
    <LayoutPage>
      <Files />
    </LayoutPage>
  );
};
