import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ErrorUtils } from '@utils/ErrorUtils';

import { AuthViewDTO } from '@api/AuthApi/models';

import { useToast } from '@hooks/useToast';
import { useDialog } from '@hooks/useDialog';

import { Form } from '@components/Form';

import { userUpdateProfile } from '@store/auth/data';
import { useAppDispatch } from '@store/hooks';

import { EditProfileFormView } from './EditProfileForm.view';

type Props = {
  data: AuthViewDTO;
  isLoadingUpdate: boolean;
  isLoadingData?: boolean;
};

export const EditProfileForm: React.FC<Props> = ({ data = {}, isLoadingUpdate }) => {
  const { name, surname, email, city, country, phone, biography } = data;
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const {} = useDialog();

  const defaultValues: AuthViewDTO = useMemo(
    () => ({
      email,
      name,
      surname,
      country,
      city,
      phone,
      biography,
    }),
    [data, isLoadingUpdate],
  );

  const formMethods = useForm<AuthViewDTO>({ defaultValues });
  // const {
  //   formState: { dirtyFields },
  // } = formMethods;

  console.log('defaultValues', data);

  // TODO сделать подтверждение на сохранение данных
  // const fieldsChanged = Object.keys(dirtyFields);
  // const formChanged = fieldsChanged.some((item) => {
  //   if (item === 'user') return;
  //   return (
  //     dataEdit[item as keyof AuthViewDTO] !== defaultValues[item as keyof AuthViewDTO].toString()
  //   );
  // });

  const submit = async (payload: AuthViewDTO) => {
    setBtnDisabled(true);
    try {
      await dispatch(userUpdateProfile(payload)).unwrap();
      setBtnDisabled(false);
      toast.success({ title: 'Well done!', text: 'Your message has been sent successfully.' });
    } catch (error) {
      setBtnDisabled(false);
      const errorMsg = ErrorUtils.handleApiError(error);
      toast.error({ title: 'Ошибка обновления данных', text: errorMsg });
    }
  };

  return (
    <>
      <Form
        onSubmit={submit}
        formMethods={formMethods}
      >
        <EditProfileFormView
          btnDisabled={btnDisabled}
          isLoading={isLoadingUpdate}
        />
      </Form>
    </>
  );
};
