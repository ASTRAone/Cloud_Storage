import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CLOUD_ROUTE } from '@utils/contants';

import { AUTH_HEADER } from '@src/utility/headers';

import { AuthDTO } from '@api/AuthApi/models';

import { Form } from '@components/Form';

import { getUserData, userLogin } from '@store/auth/data';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { AuthView } from './Auth.view';

export const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorRes, setErrorRes] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { status } = useAppSelector(getUserData);

  const loginUser = async (data: AuthDTO) => {
    setBtnDisabled(true);
    try {
      const { accessToken } = await dispatch(userLogin(data)).unwrap();
      localStorage.setItem(AUTH_HEADER, `Bearer ${accessToken}`);
      navigate(CLOUD_ROUTE);
    } catch (error) {
      setErrorRes(true);
      setBtnDisabled(false);
      console.log(error);
    }
  };

  return (
    <Form onSubmit={loginUser}>
      <AuthView
        loading={status === 'loading'}
        isError={errorRes}
        isDisabled={btnDisabled}
        setError={setErrorRes}
      />
    </Form>
  );
};
