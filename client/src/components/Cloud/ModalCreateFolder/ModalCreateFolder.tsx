import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useStyles } from '@hooks/useStyles';

import { Modal } from '@components/Modal';
import { Form } from '@components/Form';
import { Input } from '@components/Input';
import { Icon } from '@components/icon';
import { Button } from '@components/Button';

import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalCreateFolder: React.FC<Props> = ({ isOpen, onClose }) => {
  const cx = useStyles(styles);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      classNameContainer={cx('modal')}
    >
      <Form>
        <div className={cx('container')}>
          <p className={cx('title')}>Creating a folder</p>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value = '' } }) => (
              <Input
                value={value}
                onChange={onChange}
                full
                placeholder="Enter a name of folder:"
                error={errors.name}
                actions={[
                  {
                    icon: (
                      <Icon
                        type="pencil"
                        className={cx('icon')}
                      />
                    ),
                    align: 'left',
                  },
                ]}
              />
            )}
            name="name"
          />

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value = '' } }) => (
              <Input
                value={value}
                onChange={onChange}
                full
                placeholder="Choose a path for a folder:"
                error={errors.path}
                actions={[
                  {
                    icon: (
                      <Icon
                        type="folder"
                        className={cx('icon')}
                      />
                    ),
                    align: 'left',
                  },
                ]}
              />
            )}
            name="path"
          />

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value = '' } }) => (
              <Input
                value={value}
                onChange={onChange}
                full
                placeholder="Choose a color for a folder:"
                error={errors.color}
                actions={[
                  {
                    icon: (
                      <Icon
                        type="pencil"
                        className={cx('icon')}
                      />
                    ),
                    align: 'left',
                  },
                ]}
              />
            )}
            name="color"
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            isUpperCase
            type="submit"
            text="create"
          />
        </div>
      </Form>
    </Modal>
  );
};
