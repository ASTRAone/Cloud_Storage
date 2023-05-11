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
  const { Dialog, openPopup, closePopup } = useDialog();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [dataEdit, setDataEdit] = useState<AuthViewDTO>({});

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
    [data],
  );

  const formMethods = useForm<AuthViewDTO>({ defaultValues });
  const {
    formState: { dirtyFields },
  } = formMethods;

  const onSubmit = async () => {
    const fieldsChanged = Object.keys(dirtyFields);
    const formChanged = fieldsChanged.some((item) => {
      return (
        dataEdit[item as keyof AuthViewDTO] !==
        (defaultValues[item as keyof AuthViewDTO] as string).toString()
      );
    });

    try {
      if (formChanged) {
        setBtnDisabled(true);
        await dispatch(userUpdateProfile(dataEdit)).unwrap();
        setBtnDisabled(false);
        toast.success({ title: 'Well done!', text: 'Your message has been sent successfully.' });
      } else {
        toast.clue({ title: 'Hi There!', text: 'No data changed' });
      }
    } catch (error) {
      setBtnDisabled(false);
      const errorMsg = ErrorUtils.handleApiError(error);
      toast.error({ title: 'Error!', text: errorMsg });
    }
  };

  const openDialogEdit = (payload: AuthViewDTO) => {
    setDataEdit(payload);
    openPopup();
  };

  const handleSubmitEdit = () => {
    onSubmit();
    closePopup();
  };

  return (
    <>
      <Form
        onSubmit={openDialogEdit}
        formMethods={formMethods}
      >
        <EditProfileFormView
          btnDisabled={btnDisabled}
          isLoading={isLoadingUpdate}
        />
      </Form>

      <Dialog
        title="Are you sure you want to update profile?"
        closeDialog={closePopup}
        onConfirm={handleSubmitEdit}
      />
    </>
  );
};
