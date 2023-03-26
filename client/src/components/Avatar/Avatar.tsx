import React from 'react';

import { AUTH_HEADER } from '@src/utility/headers';

import { usePopupControls } from '@hooks/usePopupControls';
import { useStyles } from '@hooks/useStyles';

import { Button } from '@components/Button';

import AvatarDefault from '@assets/images/user-avatar.png';

import { userLogout } from '@store/auth/data';
import { useAppDispatch } from '@store/hooks';

import styles from './styles.module.scss';

type Props = {
  src?: string;
  fullName: string;
};

export const Avatar: React.FC<Props> = ({ src }) => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { isOpened, openPopup } = usePopupControls();

  const handleOpenPopup = (e: any) => {
    e.stopPropagation();
    openPopup();
  };
  // const handleClosePopup = (e: any) => {
  //   e.stopPropagation();
  //   closePopup();
  // };

  const logout = async (e: any) => {
    e.stopPropagation();
    try {
      localStorage.removeItem(AUTH_HEADER);
      await dispatch(userLogout()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cx('container')}
      onClick={(e) => handleOpenPopup(e)}
    >
      <div className={cx('content')}>
        <img
          src={src ? src : AvatarDefault}
          alt="avatar"
          className={cx('avatar')}
        />
        <p className={cx('name')}>Смирнов В.В.</p>
      </div>
      {isOpened && (
        <div className={cx('menu')}>
          <Button
            text="Выйти"
            onClick={(e) => logout(e)}
          />
        </div>
      )}
    </div>
  );
};
