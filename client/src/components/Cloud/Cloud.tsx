import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { DrageComponent } from '@components/DrageComponent';
import { FolderComponent } from '@components/FolderComponent';
import { RecentlyUploaded } from '@components/RecentlyUploaded';
import { SharedFolders } from '@components/SharedFolders';

import styles from './styles.module.scss';

type Props = {
  type: string;
  title: string;
  files: string;
  gb: string;
};

const FOLDERS: Array<Props> = [
  { type: 'music', title: 'Music', files: '12', gb: '54' },
  { type: 'images', title: 'Images', files: '41', gb: '622' },
  { type: 'films', title: 'Films', files: '41', gb: '2' },
  { type: 'documents', title: 'Documents', files: '121', gb: '252' },
  { type: 'music', title: 'Music', files: '5', gb: '232' },
  { type: 'films', title: 'Films', files: '15', gb: '532' },
];

export const Cloud: React.FC = () => {
  const cx = useStyles(styles);

  return (
    <div className={cx('page')}>
      <DrageComponent />
      <div className={cx('container')}>
        {FOLDERS.map(({ type, title, files, gb }, index) => (
          <FolderComponent
            key={index}
            type={type}
            title={title}
            files={files}
            gb={gb}
          />
        ))}
      </div>
      <div className={cx('info-panel')}>
        <RecentlyUploaded />
        <SharedFolders />
      </div>
    </div>
  );
};
