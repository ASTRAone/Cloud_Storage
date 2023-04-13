import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { FileCreateDTO } from '@api/FileApi/models';

import { Input } from '@components/Input';
import { PopupComponent } from '@components/PopupComponent';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { createFile, fetchFiles, getFilesData } from '@store/file/data';

type Props = {
  isOpen?: boolean;
  closeModal?: () => void;
  currentDir?: string;
};

type PropsForm = {
  name: string;
};

export const ModalCreateFile: React.FC<Props> = ({ isOpen, closeModal = () => {}, currentDir }) => {
  const dispatch = useAppDispatch();
  const { status, statusCreate } = useAppSelector(getFilesData);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(false);

  const isLoading = status === 'loading' || statusCreate === 'loading';

  const handleCreateFile = async (data: unknown) => {
    setBtnDisabled(true);
    const { name } = data as PropsForm;
    const payload: FileCreateDTO = {
      name,
      type: 'dir',
    };

    if (currentDir) {
      payload.parent = currentDir;
    }
    try {
      await dispatch(createFile(payload)).unwrap();
      await dispatch(fetchFiles(currentDir)).unwrap();
      closeModal();
    } catch (error) {
      setError(true);
      setBtnDisabled(false);
      console.log(error);
    }
  };

  return (
    <PopupComponent
      open={isOpen}
      loading={isLoading}
      isDisabled={btnDisabled}
      close={closeModal}
      title="Creating a folder"
      error={error}
      submit={handleSubmit(handleCreateFile)}
    >
      <Controller
        control={control}
        rules={{ required: true, minLength: 1 }}
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            placeholder="Enter a folder name"
            error={errors.name}
          />
        )}
        name="name"
      />
    </PopupComponent>
  );
};
