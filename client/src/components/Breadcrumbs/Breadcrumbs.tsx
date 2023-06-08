import React from 'react';

import { BreadCrumbStack } from '@utils/common';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';

import styles from './styles.module.scss';

type Props = {
  breadcrumbsPath?: BreadCrumbStack[];
  navDir: (nav: string, index: number) => void;
};

export const Breadcrumbs: React.FC<Props> = ({ breadcrumbsPath, navDir }) => {
  const cx = useStyles(styles);

  return (
    <div className={cx('container')}>
      {breadcrumbsPath?.map(({ dirId, name }, index) => (
        <div
          className={cx('container-breadcrumbs')}
          key={index}
        >
          {index === 0 ? (
            <span
              className={cx('btn')}
              onClick={() => navDir('', -1)}
            >
              Root
            </span>
          ) : null}
          <span className={cx('arrow-forward')}>
            <Icon
              type="arrow-breadcrumbs"
              className={cx('icon')}
              size="xl"
            />
          </span>
          <span
            className={index + 1 !== breadcrumbsPath.length ? cx('btn') : cx('noclickable_btn')}
            onClick={() => (index + 1 !== breadcrumbsPath.length ? navDir(dirId, index) : null)}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};
