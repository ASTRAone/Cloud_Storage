import React from 'react';

import { AUTH_HEADER } from '@utils/headers';

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '@src/utility/contants';

import { StorageService } from '@services/StorageService';

import { useStyles } from '@hooks/useStyles';

import { ButtonLink } from '@components/ButtonLink';
import { Avatar } from '@components/Avatar';

import Logo from '../../assets/images/cloud-logo.png';
import styles from './styles.module.scss';

const storageService = StorageService.getInstance();

export const NavBar: React.FC = () => {
  const cx = useStyles(styles);
  const token = storageService.getItem(AUTH_HEADER);

  return (
    <div className={cx('headerPanel')}>
      <div className={cx('containerLogo')}>
        <img
          src={Logo}
          alt=""
          className={cx('img')}
        />
        <div className={cx('logo__title')}>mern cloud</div>
      </div>
      <div className={cx('btns')}>
        {!token && (
          <ButtonLink
            className={cx('login')}
            to={LOGIN_ROUTE}
            text="Войти"
          />
        )}
        {!token && (
          <ButtonLink
            className={cx('registration')}
            to={REGISTRATION_ROUTE}
            text="Регистрация"
          />
        )}
        {/* {user?.isAuth && <Button text="Выйти" onClick={logout} />} */}
        {token && <Avatar fullName="Смирнов В.В." />}
      </div>
    </div>
  );
};
