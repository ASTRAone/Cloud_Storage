import React from 'react';
import { useLocation } from 'react-router-dom';

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '@utils/contants';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';

import CloudLogo from '@assets/images/logo.png';

import styles from './styles.module.scss';

export const HeaderLayout: React.FC = () => {
  const cx = useStyles(styles);
  const location = useLocation();
  return (
    <div className={cx('container')}>
      <div className={cx('containerLogo')}>
        <img
          src={CloudLogo}
          alt="logo"
        />
        <div className={cx('containerText')}>
          mern <span className={cx('span')}>cloud</span>
        </div>
      </div>
      <div className={cx('containerOptions')}>
        <Icon
          type="moon"
          className={cx('icon')}
        />
        <p className={cx('text')}>what’s about?</p>
        {location.pathname === LOGIN_ROUTE ? (
          <ButtonLink
            text="registration"
            className={cx('btn')}
            to={REGISTRATION_ROUTE}
          />
        ) : (
          <ButtonLink
            text="sign in"
            className={cx('btn')}
            to={LOGIN_ROUTE}
          />
        )}
      </div>
    </div>
  );
};
