import React from 'react';

import { LayoutPage } from '@src/layout/LayoutPage';

import { Favorites } from '@components/Favorites';

export const FavoritesPage: React.FC = () => {
  return (
    <LayoutPage>
      <Favorites />
    </LayoutPage>
  );
};
