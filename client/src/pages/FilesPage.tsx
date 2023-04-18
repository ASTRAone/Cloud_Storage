import React from 'react';

import { LayoutPage } from '@src/layout/LayoutPage';

import { Files } from '@components/Files';

export const FilesPage: React.FC = () => {
  return (
    <LayoutPage>
      <Files />
    </LayoutPage>
  );
};
