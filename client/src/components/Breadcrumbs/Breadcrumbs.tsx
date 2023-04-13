import React from 'react';

import { useStyles } from '@hooks/useStyles';

// import { Button } from '@components/Button';

import styles from './styles.module.scss';

interface BreadCrumbsStack {
  name: string;
  dirId: string;
}

type Props = {
  breadcrumbsPath?: BreadCrumbsStack[];
  navDir: (nav: string, index: number) => void;
};

export const Breadcrumbs: React.FC<Props> = ({ breadcrumbsPath, navDir }) => {
  const cx = useStyles(styles);

  return (
    <div className={cx('container')}>
      {breadcrumbsPath?.map(({ dirId, name }, index) => (
        <div key={index}>
          {index == 0 ? (
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
