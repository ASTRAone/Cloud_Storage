import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '@utils/contants';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';

import CloudLogo from '@assets/images/logo.png';

import styles from './styles.module.scss';

export const HeaderLayout: React.FC = () => {
  const cx = useStyles(styles);
  const location = useLocation();
  const { t } = useTranslation();
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
        <p className={cx('text')}>{t('navBar.title.about')}</p>
        {location.pathname === LOGIN_ROUTE ? (
          <ButtonLink
            text={t('navBar.title.signup')}
            className={cx('btn')}
            to={REGISTRATION_ROUTE}
          />
        ) : (
          <ButtonLink
            text={t('navBar.title.signin')}
            className={cx('btn')}
            to={LOGIN_ROUTE}
          />
        )}
      </div>
    </div>
  );
};
