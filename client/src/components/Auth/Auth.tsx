import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CLOUD_ROUTE } from '@utils/contants';
import { ErrorUtils } from '@utils/ErrorUtils';

import { AUTH_HEADER } from '@src/utility/headers';

import { AuthDTO } from '@api/AuthApi/models';

import { StorageService } from '@services/StorageService';

import { useToast } from '@hooks/useToast';

import { Form } from '@components/Form';

import { getUserData, userLogin } from '@store/auth/data';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { AuthView } from './Auth.view';

const storageService = StorageService.getInstance();

export const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [errorRes, setErrorRes] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { status } = useAppSelector(getUserData);

  const loginUser = async (data: AuthDTO) => {
    setBtnDisabled(true);
    try {
      const { accessToken } = await dispatch(userLogin(data)).unwrap();
      storageService.setItem(AUTH_HEADER, `Bearer ${accessToken}`);
      navigate(CLOUD_ROUTE);
      toast.success({ title: 'Авторизация прошла успешна' });
    } catch (error) {
      const errorMsg = ErrorUtils.handleApiError(error);
      setErrorRes(true);
      setBtnDisabled(false);
      toast.error({ title: 'Ошибка авторизации', text: errorMsg });
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
