import React from 'react';

import { FolderView, UUID } from '@utils/common';

import { FileResponse } from '@api/FileApi/models';

import { useStyles } from '@hooks/useStyles';

import { File } from '@components/File/File';
import { EmptyComponent } from '@components/EmptyComponent';
import { SkeletonLoadingFiles } from '@components/SkeletonLoadingFiles';

import styles from './styles.module.scss';

type Props = {
  data: FileResponse[];
  view: FolderView;
  isLoading: boolean;
  customEmptyComponent?: JSX.Element;
  onClick?: (value: UUID) => void;
};

export const FileList: React.FC<Props> = ({
  data,
  view,
  isLoading,
  customEmptyComponent,
  onClick = () => {},
}) => {
  const cx = useStyles(styles);

  return (
    <div className={cx(view === 'list' ? 'container' : 'container-plate')}>
      {view === 'list' && data.length > 0 && (
        <div className={cx('header')}>
          <div className={cx('sort-name')}>Name</div>
          <div className={cx('sort-date')}>Date</div>
          <div className={cx('sort-size')}>Size</div>
          <div className={cx('sort-delete')}>Delete</div>
          <div className={cx('sort-download')}>Download</div>
        </div>
      )}
      {isLoading ? (
        <SkeletonLoadingFiles />
      ) : data.length > 0 ? (
        data?.map((item) => (
          <File
            view={view}
            file={item}
            key={item._id}
            isFavorite={item.isFavorite}
            onClick={item.type === 'dir' ? () => onClick(item._id) : undefined}
          />
        ))
      ) : (
        customEmptyComponent ?? <EmptyComponent />
      )}
    </div>
  );
};
