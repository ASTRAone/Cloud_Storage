import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOGIN_ROUTE } from '@src/utility/contants';

import { AuthRegDTO } from '@api/AuthApi/models';

import { Form } from '@components/Form';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getUserData, userRegistration } from '@store/auth/data';

import { RegistrationView } from './Registration.view';

export const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { statusReg } = useAppSelector(getUserData);
  const [errorRes, setErrorRes] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const createUser = async (data: AuthRegDTO) => {
    setBtnDisabled(true);
    try {
      await dispatch(userRegistration({ ...data, language: 'en-US' })).unwrap();
      navigate(LOGIN_ROUTE);
    } catch (error) {
      setErrorRes(true);
      setBtnDisabled(false);
      console.log(error);
    }
  };

  return (
    <Form onSubmit={createUser}>
      <RegistrationView
        isError={errorRes}
        isDisabled={btnDisabled}
        loading={statusReg === 'loading'}
        setError={setErrorRes}
      />
    </Form>
  );
};
