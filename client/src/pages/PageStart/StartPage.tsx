import React from 'react';

import { REGISTRATION_ROUTE } from '@utils/contants';

import { LayoutStartPage } from '@src/layout/LayoutStartPage';

import { useStyles } from '@hooks/useStyles';

import { Button } from '@components/Button';
import { ButtonLink } from '@components/ButtonLink';

import styles from './styles.module.scss';

export const StartPage: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <LayoutStartPage>
      <div className={cx('page')}>
        <div className={cx('header')}>
          <div className={cx('text-block')}>
            <p className={cx('title')}>
              Unlock Your Business Potential With Cloud Mern & Fucking Mother
            </p>
            <p className={cx('text')}>Fuck your beer and father, I love only Grandfather.</p>
            {/* TODO: возможно, заменить на ButtonLink */}
            <Button
              text="get started"
              color="light-blue"
              isUpperCase
              classNameContainer={cx('btn-container')}
              classNameBtn={cx('btn')}
            />
          </div>
          <div className={cx('circle', 'center')} />
          <div className={cx('circle', 'bottom')} />
        </div>
        <div className={cx('bg-header')} />
        <section className={cx('sign')}>
          <div className={cx('text-block')}>
            <p className={cx('text')}>Register your ass and shut the fuck up, bugger, yo!.</p>
            <ButtonLink
              to={REGISTRATION_ROUTE}
              text="sign up"
              isUpperCase
              className={cx('btn')}
            />
          </div>
          <div className={cx('circle')} />
        </section>
        <section className={cx('feature')} />
      </div>
    </LayoutStartPage>
  );
};
