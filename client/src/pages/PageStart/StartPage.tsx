import React from 'react';

import { REGISTRATION_ROUTE } from '@utils/contants';

import { LayoutStartPage } from '@src/layout/LayoutStartPage';

import { StorageService } from '@services/StorageService';

import { useStyles } from '@hooks/useStyles';

import { Button } from '@components/Button';
import { ButtonLink } from '@components/ButtonLink';
import { Icon } from '@components/icon';

import styles from './styles.module.scss';
import { Card } from './components/Card';

const storageService = StorageService.getInstance();

export const StartPage: React.FC = () => {
  const cx = useStyles(styles);
  const handlePreviewCheck = () => storageService.setItem('previewCheck', true);

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
              onClick={handlePreviewCheck}
            />
          </div>
          <div className={cx('circle')} />
        </section>
        <section className={cx('feature')}>
          <div className={cx('cards-container')}>
            <Card
              title="Feature One"
              text="
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            />
            <Card
              title="Feature Two"
              text="
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            />
            <Card
              title="Feature There"
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            />
          </div>
          <div className={cx('bg')} />
          <div className={cx('circle-bottom')} />
        </section>
        <div className={cx('circle-left-feature')} />
        <section className={cx('feedback')}>
          <p className={cx('title')}>Subscribe and get your fucking news.</p>
          <div className={cx('email-block')}>
            <Icon
              type="mail"
              className={cx('icon')}
            />
            <a
              href="mailto:voidstein@gmail.com"
              className={cx('text')}
            >
              voidstein@gmail.com
            </a>
          </div>
        </section>
        <div className={cx('circle')} />
      </div>
    </LayoutStartPage>
  );
};
