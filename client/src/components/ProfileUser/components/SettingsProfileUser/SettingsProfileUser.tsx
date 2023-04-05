import React from 'react';

import { Form } from '@components/Form';

import { SettingsProfileUserView } from './SettingsProfileUser.view';

export const SettingsProfileUser: React.FC = () => {
  const submit = (data: any) => {
    console.log(data);
  };

  return (
    <Form onSubmit={submit}>
      <SettingsProfileUserView />
    </Form>
  );
};
