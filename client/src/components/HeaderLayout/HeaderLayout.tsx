import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '@utils/contants';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';
import { MenuProfile } from '@components/MenuProfile';
import { InputSearch } from '@components/InputSearch';
import { InputFilter } from '@components/InputFilter';

import CloudLogo from '@assets/images/logo.png';

import styles from './styles.module.scss';

type Props = {
  auth?: boolean;
};

export const HeaderLayout: React.FC<Props> = ({ auth }) => {
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
      {!auth ? (
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
      ) : (
        <>
          <div className={cx('containerInputs')}>
            <InputSearch
              full
              placeholder={t('navBar.placeholder.search')}
              actions={[
                {
                  icon: (
                    <Icon
                      type="magnifier"
                      className={cx('icon')}
                    />
                  ),
                  align: 'left',
                },
              ]}
            />
            <InputFilter
              full
              header
              placeholder={t('navBar.placeholder.filter')}
              actions={[
                {
                  icon: (
                    <Icon
                      type="arrowDown"
                      className={cx('icon')}
                    />
                  ),
                  align: 'right',
                },
              ]}
            />
          </div>
          <div className={cx('containerOptions')}>
            <Icon
              type="moon"
              className={cx('icon')}
            />
            <Icon
              type="bell"
              className={cx('icon')}
            />
            <p className={cx('text')}>
              <MenuProfile
                name="Vlados Panov"
                email="voidstein@gmail.com"
              />
            </p>
          </div>
        </>
      )}
    </div>
  );
};
