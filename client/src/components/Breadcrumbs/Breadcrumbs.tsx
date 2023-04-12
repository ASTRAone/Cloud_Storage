import React from 'react';

import { useStyles } from '@hooks/useStyles';

// import { useStyles } from '@hooks/useStyles';
// import { getFilesData, pushToStack, selectedDir } from '@store/file/data';

import { Button } from '@components/Button';

import styles from './styles.module.scss';

type Props = {
  path?: string[];
  navDir: (nav: string) => void;
};

export const Breadcrumbs: React.FC<Props> = ({ path, navDir }) => {
  const cx = useStyles(styles);

  return (
    <div className={cx('container', 'btns')}>
      {path?.length == 0 ? (
        <Button text="root" />
      ) : (
        path?.map((name, index) => (
          <div key={index}>
            <Button
              text={name}
              onClick={() => navDir(name)}
            />
            {'>>>'}
          </div>
        ))
      )}
    </div>
  );
};
