import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStyles } from "../../../hooks/useStyles";

import { PopupComponent } from "../../PopupComponent";
import { Input } from "../../Input";

import { FileCreateDTO } from "../../../api/FileApi/models";

import { createFile, getFilesData, fetchFiles } from "../../../store/file/data";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import styles from "./styles.module.scss";

type Props = {
  isOpen?: boolean;
  closeModal?: () => void;
  currentDir?: string;
};

type PropsForm = {
  name: string;
};

export const ModalCreateFile: React.FC<Props> = ({
  isOpen,
  closeModal = () => {},
  currentDir,
}) => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { status, statusCreate } = useAppSelector(getFilesData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(false);

  const isLoading = status === "loading" || statusCreate === "loading";

  const handleCreateFile = async (data: unknown) => {
    const { name } = data as PropsForm;
    console.log('currentDir', currentDir)
    const payload: FileCreateDTO = {
      name,
      type: "dir",
    };

    if (currentDir) {
      payload.parent = currentDir
    }
    try {
      await dispatch(createFile(payload)).unwrap();
      await dispatch(fetchFiles(currentDir)).unwrap();
      closeModal();
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <PopupComponent
      open={isOpen}
      loading={isLoading}
      close={closeModal}
      title="Создание папки"
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
            isBorder
            placeholder="Введите название папки"
            error={errors.name}
          />
        )}
        name="name"
      />
    </PopupComponent>
  );
};
