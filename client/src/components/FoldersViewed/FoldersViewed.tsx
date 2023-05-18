import React from 'react';

import { FolderView } from '@utils/common';
import { FOLDERS_VIEWED } from '@utils/contants';

import { useStyles } from '@hooks/useStyles';

import { Popup } from '@components/Popup';
import { Icon } from '@components/icon';

import styles from './styles.module.scss';

type Props = {
  view: FolderView;
  onChange: (value: FolderView) => void;
};

export const FoldersViewed: React.FC<Props> = ({ view, onChange }) => {
  const cx = useStyles(styles);
  return (
    <Popup
      trigger={
        <>
          <div className={cx('container-popup')}>
            <Icon
              type={view}
              className={cx('icon-popup')}
            />
          </div>
        </>
      }
    >
      <div className={cx('content-popup')}>
        {FOLDERS_VIEWED.map(({ title, type }) => {
          const isActive = type === view;
          return (
            <div
              key={type}
              className={cx('item-popup', isActive ? 'active' : '')}
              onClick={() => onChange(type as FolderView)}
            >
              <Icon
                type={type}
                className={cx('icon')}
              />
              <p className={cx('title-popup')}>{title}</p>
            </div>
          );
        })}
      </div>
    </Popup>
  );
};
