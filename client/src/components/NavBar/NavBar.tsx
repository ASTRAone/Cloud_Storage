import React, { useEffect } from 'react';

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '@src/utility/contants';

import { useAuth } from '@hooks/useAuth';
import { useStyles } from '@hooks/useStyles';

import { ButtonLink } from '@components/ButtonLink';
import { Avatar } from '@components/Avatar';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getUserData, userReload } from '@store/auth/data';

import Logo from '../../assets/images/cloud-logo.png';
import styles from './styles.module.scss';

export const NavBar: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getUserData);

  useAuth();
  useEffect(() => {
    dispatch(userReload()).unwrap();
  }, []);

  // const logout = async () => {
  //   try {
  //     localStorage.removeItem(AUTH_HEADER);
  //     await dispatch(userLogout()).unwrap();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className={cx('navBar')}>
      <div className={cx('containerLogo')}>
        <img
          src={Logo}
          alt=""
          className={cx('img')}
        />
        <div className={cx('logo__title')}>mern cloud</div>
      </div>
      <div className={cx('btns')}>
        {!user?.isAuth && (
          <ButtonLink
            className={cx('login')}
            to={LOGIN_ROUTE}
            text="Войти"
          />
        )}
        {!user?.isAuth && (
          <ButtonLink
            className={cx('registration')}
            to={REGISTRATION_ROUTE}
            text="Регистрация"
          />
        )}
        {/* {user?.isAuth && <Button text="Выйти" onClick={logout} />} */}
        {user?.isAuth && <Avatar fullName={user.name} />}
      </div>
    </div>
  );
};
