import React, { useState } from "react";
import { useStyles } from "../../../hooks/useStyles";

import { useAppDispatch } from "../../../redux/store/configurationStore";

import { PopupComponent } from "../../PopupComponent";
import { Input } from "../../Input";
import { useForm, Controller } from "react-hook-form";
import { createFile, files } from "../../../redux/actions/file.action";

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
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCreateFile = async (data: unknown) => {
    const { name } = data as PropsForm;
    const payload = {
      name,
      parent: currentDir,
    };
    try {
      setLoading(true);
      setError(false);
      const res = await dispatch(createFile(payload)).unwrap();
      if (res?.response?.status === 400) {
        setError(true);
        setLoading(false);
        return;
      }
      await dispatch(files(currentDir)).unwrap();
      setLoading(false);
      closeModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const cx = useStyles(styles);
  return (
    <PopupComponent
      open={isOpen}
      loading={loading}
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
            placeholder="Введите название папки"
            error={errors.name}
          />
        )}
        name="name"
      />
    </PopupComponent>
  );
};
