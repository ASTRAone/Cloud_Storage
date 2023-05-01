import React, { ChangeEvent } from 'react';

import { useStyles } from '@hooks/useStyles';

import { Input } from '@components/Input';
import { Icon } from '@components/icon';

import DefaultAvatar from '@assets/images/default-avatar.png';

import { useAppDispatch } from '@store/hooks';
import { userUploadAvatar } from '@store/auth/data';

import styles from './styles.module.scss';

// TODO добавить toast

type Porps = {
  src?: string;
};

export const AvatarUser: React.FC<Porps> = ({ src = '' }) => {
  const cx = useStyles(styles);
  const dispath = useAppDispatch();

  const handleUploadAvatar = async (event: ChangeEvent<HTMLInputElement> | null) => {
    const file = event?.target?.files && event.target.files[0];
    if (file) {
      try {
        await dispath(userUploadAvatar(file)).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <img
          className={cx('img')}
          src={src || DefaultAvatar}
          alt="avatar"
        />
        <label
          htmlFor="upload"
          className={cx('label')}
        >
          <Icon
            type="camera"
            className={cx('icon')}
          />
        </label>
        <Input
          id="upload"
          type="file"
          onChange={(event) => handleUploadAvatar(event)}
          className={cx('input')}
        />
      </div>
    </div>
  );
};
