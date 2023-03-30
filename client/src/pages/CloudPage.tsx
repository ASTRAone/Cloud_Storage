import React, { useEffect } from 'react';

import { LayoutPage } from '@src/layout/LayoutPage';

import { Cloud } from '@components/Cloud';

import { useAppDispatch } from '@store/hooks';
import { fetchFiles } from '@store/file/data';

// Перенести в компонент получение файлов
export const CloudPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFiles());
  });

  return (
    <LayoutPage>
      <Cloud />
    </LayoutPage>
  );
};
