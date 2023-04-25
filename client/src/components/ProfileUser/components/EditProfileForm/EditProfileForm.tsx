import React, { useEffect } from 'react';

import { Form } from '@components/Form';

// import { useAppDispatch } from '@store/hooks';

import { EditProfileFormView } from './EditProfileForm.view';

export const EditProfileForm: React.FC = () => {
  // const dispath = useAppDispatch();

  useEffect(() => {
    // dispath()
  }, []);

  const submit = (data: any) => {
    console.log(data);
  };

  return (
    <Form onSubmit={submit}>
      <EditProfileFormView />
    </Form>
  );
};
