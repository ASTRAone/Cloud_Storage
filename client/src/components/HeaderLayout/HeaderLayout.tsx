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
import { PopupLocalization } from '@components/PopupLocalization';

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
          <PopupLocalization />
          <Icon
            type="moon"
            className={cx('icon')}
          />
          <p className={cx('text')}>{t('headerPanel.title.about')}</p>
          {location.pathname === LOGIN_ROUTE ? (
            <ButtonLink
              text={t('headerPanel.title.signup')}
              className={cx('btn')}
              to={REGISTRATION_ROUTE}
            />
          ) : (
            <ButtonLink
              text={t('headerPanel.title.signin')}
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
              placeholder={t('headerPanel.placeholder.search')}
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
              placeholder={t('headerPanel.placeholder.filter')}
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
            <PopupLocalization />
            <Icon
              type="moon"
              className={cx('icon')}
            />
            <Icon
              type="bell"
              className={cx('icon')}
            />
            <div className={cx('profile')}>
              <MenuProfile
                name="Vlados Panov"
                email="voidstein@gmail.com"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
