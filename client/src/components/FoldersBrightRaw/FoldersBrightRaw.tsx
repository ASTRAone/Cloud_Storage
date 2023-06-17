import React, { useState } from 'react';
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd';

import { FOLDERS } from '@utils/contants';

import { useStyles } from '@hooks/useStyles';
import { usePopupControls } from '@hooks/usePopupControls';

import { FolderComponent } from '@components/FolderComponent';
import { CloudPopup } from '@components/Cloud/CloudPopup';
import { ModalCreateFolder } from '@components/Cloud/ModalCreateFolder';

import styles from './styles.module.scss';

const HEIGHT_DROP_ZONE = 214 * Math.ceil(FOLDERS.length / 6);

// TODO: добавить проверку, если есть директории, то отображать директории пользователя, иначе по стандарту 5

type Props = {
  key: number;
  type: string;
  title: string;
  files: string;
  gb: string;
};

export const FoldersBrightRaw: React.FC = () => {
  const cx = useStyles(styles);
  const [folders, setFolders] = useState<Props[]>(FOLDERS);
  const { isOpened, closePopup, openPopup } = usePopupControls();

  const onChange = (sourceId: string, sourceIndex: number, sourceTarget: number) => {
    const nextState = swap(folders, sourceIndex, sourceTarget);
    setFolders(nextState);
  };

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('top-panel')}>
          <p className={cx('title')}>Categories</p>
          <CloudPopup openModal={openPopup} />
        </div>
        <GridContextProvider onChange={onChange}>
          {/* TODO временное решение по высоте */}
          <GridDropZone
            id="items"
            boxesPerRow={6}
            rowHeight={214}
            style={{
              height: HEIGHT_DROP_ZONE,
            }}
            className={cx('content')}
          >
            {folders.map(({ key, type, title, files, gb }) => (
              <GridItem
                key={key}
                className={cx('folder-item')}
              >
                <FolderComponent
                  type={type}
                  title={title}
                  files={files}
                  gb={gb}
                />
              </GridItem>
            ))}
          </GridDropZone>
        </GridContextProvider>
      </div>
      {isOpened && (
        <ModalCreateFolder
          isOpen={isOpened}
          onClose={closePopup}
        />
      )}
    </>
  );
};

export type { Props as PropsFolders };
