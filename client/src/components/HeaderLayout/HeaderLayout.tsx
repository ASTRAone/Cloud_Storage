import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ALL_FILES_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '@utils/contants';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';
import { MenuProfile } from '@components/MenuProfile';
import { InputSearch } from '@components/InputSearch';
import { PopupLocalization } from '@components/PopupLocalization';
import { SelectTreeNode } from '@components/SelectTreeNode';

import CloudLogo from '@assets/images/logo.png';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getUserData, userReload } from '@store/auth/data';
import { getSearchText, searchFile, setSearchText } from '@store/file/data';

import styles from './styles.module.scss';

type Props = {
  auth?: boolean;
};

export const HeaderLayout: React.FC<Props> = ({ auth }) => {
  const cx = useStyles(styles);
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getUserData);
  const { searchText } = useAppSelector(getSearchText);
  const [enterSearchName, setEnterSearchName] = useState('');

  const [selectedTree, setSelectedTree] = useState<(string | number | undefined)[]>([]);

  useEffect(() => {
    dispatch(userReload()).unwrap();
  }, []);

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (location.pathname !== ALL_FILES_ROUTE) {
      navigate(ALL_FILES_ROUTE);
    }
    if (e.target.value === '') {
      navigate(-1);
    }
    setEnterSearchName(e.target.value);
    dispatch(setSearchText(e.target.value));
    dispatch(searchFile(e.target.value)).unwrap();
  };

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
              value={searchText ?? enterSearchName}
              onChange={(e) => searchChangeHandler(e)}
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
            <SelectTreeNode
              iconAnimation
              icon="right"
              multiple
              checkStrictly
              value={selectedTree}
              onChangeSelected={setSelectedTree}
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
                src=""
                name={user?.name + ' ' + user?.surname}
                email={user?.email}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
