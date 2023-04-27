import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ErrorUtils } from '@utils/ErrorUtils';

import { AuthViewDTO } from '@api/AuthApi/models';

import { useToast } from '@hooks/useToast';

import { Form } from '@components/Form';

import { userUpdateProfile } from '@store/auth/data';
import { useAppDispatch } from '@store/hooks';

import { EditProfileFormView } from './EditProfileForm.view';

type Props = {
  data: AuthViewDTO;
  isLoading: boolean;
};

export const EditProfileForm: React.FC<Props> = ({ data, isLoading }) => {
  const { name, surname, email, city, country, phone, biography } = data;
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [btnDisabled, setBtnDisabled] = useState(false);

  const defaultValues: AuthViewDTO = {
    email,
    name,
    surname,
    country,
    city,
    phone,
    biography,
  };

  const formMethods = useForm<AuthViewDTO>({ defaultValues });

  const submit = async (payload: AuthViewDTO) => {
    setBtnDisabled(true);
    try {
      await dispatch(userUpdateProfile(payload)).unwrap();
      setBtnDisabled(false);
      toast.success({ title: 'Данные обновлены' });
    } catch (error) {
      const errorMsg = ErrorUtils.handleApiError(error);
      setBtnDisabled(false);
      toast.error({ title: 'Ошибка обновления данных', text: errorMsg });
    }
  };

  return (
    <Form
      onSubmit={submit}
      formMethods={formMethods}
    >
      <EditProfileFormView
        btnDisabled={btnDisabled}
        isLoading={isLoading}
      />
    </Form>
  );
};
