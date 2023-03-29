import React, { useState } from 'react';

import { AUTH_HEADER } from '@src/utility/headers';

import { AuthDTO } from '@api/AuthApi/models';

import { Form } from '@components/Form';

import { getUserData, userLogin } from '@store/auth/data';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { AuthView } from './Auth.view';

export const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const [errorRes, setErrorRes] = useState(false);
  const { status } = useAppSelector(getUserData);

  const loginUser = async (data: AuthDTO) => {
    try {
      const { accessToken } = await dispatch(userLogin(data)).unwrap();
      localStorage.setItem(AUTH_HEADER, `Bearer ${accessToken}`);
    } catch (error) {
      setErrorRes(true);
      console.log(error);
    }
  };

  return (
    <Form onSubmit={loginUser}>
      <AuthView
        loading={status === 'loading'}
        isError={errorRes}
        setError={setErrorRes}
      />
    </Form>
  );
};
