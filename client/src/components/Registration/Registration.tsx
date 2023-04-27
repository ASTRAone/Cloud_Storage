import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorUtils } from '@utils/ErrorUtils';

import { LOGIN_ROUTE } from '@src/utility/contants';

import { AuthRegDTO } from '@api/AuthApi/models';

import { useToast } from '@hooks/useToast';

import { Form } from '@components/Form';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getUserData, userRegistration } from '@store/auth/data';

import { RegistrationView } from './Registration.view';

export const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { statusReg } = useAppSelector(getUserData);
  const [errorRes, setErrorRes] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const createUser = async (data: AuthRegDTO) => {
    setBtnDisabled(true);
    try {
      await dispatch(userRegistration({ ...data, language: 'en-US' })).unwrap();
      navigate(LOGIN_ROUTE);
      toast.success({ title: 'Регистрация прошла успешно' });
    } catch (error) {
      const errorMsg = ErrorUtils.handleApiError(error);
      setErrorRes(true);
      setBtnDisabled(false);
      toast.error({ title: 'Ошибка регистрации', text: errorMsg });
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
