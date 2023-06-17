import React from 'react';

import { useStyles } from '@hooks/useStyles';
import { usePopupControls } from '@hooks/usePopupControls';

import { Popup } from '@components/Popup';
import { Icon } from '@components/icon';
import { MenuItem } from '@components/MenuIteim';
import { IconTypes } from '@components/icon/IconDictionary';

import styles from './styles.module.scss';

type Props = {
  openModal: () => void;
};

type PropsMenu = {
  id: string;
  typeIcon: IconTypes;
  title: string;
  type: 'create';
};

const MENU: PropsMenu[] = [
  {
    id: 'folder',
    typeIcon: 'folder',
    title: 'create folder',
    type: 'create',
  },
];

export const CloudPopup: React.FC<Props> = ({ openModal }) => {
  const cx = useStyles(styles);
  const { isOpened, closePopup, openPopup } = usePopupControls();

  const onClick = (type: 'create') => {
    if (type === 'create') {
      openModal();
      closePopup();
    }
  };

  const subitemsNode = MENU.map(({ title, typeIcon, type }, index) => (
    <MenuItem
      key={index}
      className={cx('contentMenu')}
      onClick={() => onClick(type)}
    >
      <Icon
        type={typeIcon}
        className={cx('iconMenu')}
      />
      <p className={cx('menuItemText')}>{title}</p>
    </MenuItem>
  ));

  return (
    <>
      <Popup
        open={isOpened}
        onClose={closePopup}
        onOpen={openPopup}
        trigger={
          <>
            <div className={cx('setting')}>
              <Icon
                type="settings"
                className={cx('icon')}
              />
            </div>
          </>
        }
      >
        <div className={cx('content')}>{subitemsNode}</div>
      </Popup>
    </>
  );
};
