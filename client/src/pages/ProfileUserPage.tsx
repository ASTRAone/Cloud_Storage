import React from 'react';

import { LayoutPage } from '@src/layout/LayoutPage';

import { ProfileUser } from '@components/ProfileUser';

export const ProfileUserPage: React.FC = () => {
  return (
    <LayoutPage isBgProfile>
      <ProfileUser />
    </LayoutPage>
  );
};
