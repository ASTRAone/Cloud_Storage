import React from 'react';

import { SHARED_ROUTE } from '@utils/contants';

import { StorageService } from '@services/StorageService';

import { useStyles } from '@hooks/useStyles';

import { ButtonLink } from '@components/ButtonLink';
import { menu } from '@components/SidePanel/SidePanel';

import styles from './styles.module.scss';
import { SharedFoldersItem } from './components/SharedFoldersItem';

// TODO сделать стор
// Сделать скелетон для лоадинга
// Реализовать динамичное отображение данных

const storageService = StorageService.getInstance();
const ACTIVE_TAB_MENU = menu[3].link;

export const SharedFolders: React.FC = () => {
  const cx = useStyles(styles);

  const getNavigatePageShared = () => {
    storageService.setItem('activeTabLC', ACTIVE_TAB_MENU);
  };

  return (
    <div className={cx('container')}>
      <ButtonLink
        to={SHARED_ROUTE}
        onClick={getNavigatePageShared}
        className={cx('title')}
      >
        <span className={cx('title')}>Shared Folders</span>
      </ButtonLink>
      <div className={cx('content')}>
        <SharedFoldersItem />
        <SharedFoldersItem />
      </div>
    </div>
  );
};
