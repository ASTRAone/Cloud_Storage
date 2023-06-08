import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { FolderComponent } from '@components/FolderComponent';

import styles from './styles.module.scss';

type Props = {
  type: string;
  title: string;
  files: string;
  gb: string;
};

const FOLDERS: Array<Props> = [
  { type: 'music', title: 'Music', files: '122', gb: '54' },
  { type: 'images', title: 'Images', files: '41', gb: '622' },
  { type: 'films', title: 'Films', files: '41', gb: '2' },
  { type: 'documents', title: 'Documents', files: '121', gb: '252' },
  { type: 'music', title: 'Music', files: '5', gb: '232' },
  { type: 'films', title: 'Films', files: '15', gb: '532' },
];

export const FoldersBrightRaw: React.FC = () => {
  const cx = useStyles(styles);
  return (
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
  );
};
