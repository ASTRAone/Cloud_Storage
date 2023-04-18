import React from 'react';

import { BreadCrumbStack } from '@utils/common';

import { useStyles } from '@hooks/useStyles';

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
        <div key={index}>
          {index === 0 ? (
            <span
              className={cx('btn')}
              onClick={() => navDir('', -1)}
            >
              Root
            </span>
          ) : null}
          <span className={cx('arrow-forward')}>{'>'}</span>
          <span
            className={cx('btn')}
            onClick={() => navDir(dirId, index)}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};
