import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AUTH_HEADER } from '@utils/headers';
import { ALL_FILES_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '@utils/contants';

import { StorageService } from '@services/StorageService';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';
import { MenuProfile } from '@components/MenuProfile';
import { PopupLocalization } from '@components/PopupLocalization';
import { SelectTreeNode } from '@components/SelectTreeNode';
import { InputSearch } from '@components/InputSearch';

import CloudLogo from '@assets/images/logo.png';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchUserData, getUserData } from '@store/auth/data';
import { fetchFoldersPath, getFoldersPath, saveSearchText } from '@store/file/data';

import styles from './styles.module.scss';

const storageService = StorageService.getInstance();

export const HeaderLayout: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const { userData, needUpdate } = useAppSelector(getUserData);
  const token = storageService.getItem(AUTH_HEADER);

  const { name, surname, email } = userData;
  const {
    foldersPaths,
    statusFoldersPath,
    needUpdate: updatePath,
  } = useAppSelector(getFoldersPath);

  const [searchText, setSearchText] = useState<string | undefined>('');
  const [selectedTree, setSelectedTree] = useState<(string | number | undefined)[]>([]);

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  useEffect(() => {
    needUpdate && dispatch(fetchUserData());
  }, [needUpdate]);

  useEffect(() => {
    dispatch(saveSearchText(searchText));
  }, [searchText]);

  useEffect(() => {
    dispatch(fetchFoldersPath());
  }, []);

  useEffect(() => {
    updatePath && dispatch(fetchFoldersPath());
  }, [updatePath]);

  const onChangeSearch = (value: string) => {
    setSearchText(value);
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
      {!token ? (
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
          {location.pathname === ALL_FILES_ROUTE ? (
            <div className={cx('containerInputs')}>
              <InputSearch
                search={searchText}
                onChangeSearch={onChangeSearch}
                full
                dataPath={foldersPaths}
                loading={statusFoldersPath === 'loading'}
                classNameContent={cx('search')}
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
          ) : null}

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
                name={`${name ?? '-'} ${surname ?? '-'}`}
                email={email ?? '-'}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
