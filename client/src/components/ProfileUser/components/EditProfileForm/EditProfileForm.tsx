import React from 'react';

import { Form } from '@components/Form';

import { EditProfileFormView } from './EditProfileForm.view';

export const EditProfileForm: React.FC = () => {
  const submit = (data: any) => {
    console.log(data);
  };

  return (
    <Form onSubmit={submit}>
      <EditProfileFormView />
    </Form>
  );
};
