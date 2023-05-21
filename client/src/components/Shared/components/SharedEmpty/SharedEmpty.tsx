import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Button } from '@components/Button';

import styles from './styles.module.scss';

type Props = {
  onClick?: () => void;
};

export const SharedEmpty: React.FC<Props> = ({ onClick = () => {} }) => {
  const cx = useStyles(styles);
  return (
    <div className={cx('container')}>
      <h3 className={cx('title')}>Shared folders for collaborative work</h3>
      <p className={cx('text')}>
        Invite multiple people into a shered folder to view, add, and edit files
      </p>
      <Button
        color="white"
        onClick={onClick}
        text="Create shared folder"
        classNameBtn={cx('btn')}
        className={cx('btn-content')}
        classNameContainer={cx('btn-container')}
      />
    </div>
  );
};
