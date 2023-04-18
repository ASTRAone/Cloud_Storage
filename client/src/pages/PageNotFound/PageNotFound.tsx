import React from 'react';

import { CLOUD_ROUTE } from '@utils/contants';

import { LayoutStartPage } from '@src/layout/LayoutStartPage';

import { useStyles } from '@hooks/useStyles';

import { ButtonLink } from '@components/ButtonLink';

import styles from './styles.module.scss';

export const PageNotFound: React.FC = () => {
  const cx = useStyles(styles);

  const handleReturnedHome = () => {
    localStorage.removeItem('activeTabLC');
  };

  return (
    <LayoutStartPage>
      <>
        <div className={cx('page')}>
          <div className={cx('content')}>
            <h1 className={cx('title')}>
              $#&^#!!! <span className={cx('span')}>404</span> !
            </h1>
            <p className={cx('sub-title')}>Oh no! Something went terribly wrong.</p>
            <p className={cx('text')}>
              Perhaps the page moved, the URL or our site’s exposed out. Or maybe, just maybe, you
              tried to travel to forbieed lands?
            </p>
            <ButtonLink
              to={CLOUD_ROUTE}
              onClick={handleReturnedHome}
              className={cx('btn')}
              text="return to home back"
              isUpperCase
            />
          </div>
        </div>
        <div className={cx('man-binocul')} />
        <div className={cx('explosion')} />
      </>
    </LayoutStartPage>
  );
};
