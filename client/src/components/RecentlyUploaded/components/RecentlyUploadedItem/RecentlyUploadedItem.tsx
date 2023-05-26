import React from 'react';

import { customDate } from '@utils/customDate';

import { FileResponseRecently } from '@api/FileApi/models';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { TextShorter } from '@components/TextShorter';

import styles from './styles.module.scss';

type Props = {
  data: FileResponseRecently;
};

export const RecentlyUploadedItem: React.FC<Props> = ({ data }) => {
  const cx = useStyles(styles);

  const { date, size, type, name } = data;
  const { day, mounth, time } = customDate(date);

  return (
    <div className={cx('container')}>
      <div className={cx('content-left')}>
        <div className={cx('folder')}>
          <Icon
            type={type === 'file' ? 'file' : 'folder'}
            className={cx('icon')}
          />
          <TextShorter
            tooltip
            className={cx('text')}
          >
            <>{name}</>
          </TextShorter>
        </div>
        <div className={cx('date-our')}>
          <p className={cx('text')}>
            {day} {mounth}
          </p>
          <p className={cx('text')}>{time}pm</p>
        </div>
      </div>
      <div className={cx('content-right')}>
        <p className={cx('text')}>{size}</p>
        <p className={cx('text', 'size')}>mb</p>
      </div>
    </div>
  );
};
