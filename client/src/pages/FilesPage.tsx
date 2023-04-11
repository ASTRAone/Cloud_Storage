import React, { useEffect } from 'react';

import { LayoutPage } from '@src/layout/LayoutPage';

import { Files } from '@components/Files';

import { useAppDispatch } from '@store/hooks';
import { fetchFiles } from '@store/file/data';

// Перенести в компонент получение файлов
export const FilesPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFiles());
  });

  return (
    <LayoutPage>
      <Files />
    </LayoutPage>
  );
};
