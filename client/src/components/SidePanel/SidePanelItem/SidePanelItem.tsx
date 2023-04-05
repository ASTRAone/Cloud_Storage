import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';
import { IconTypes } from '@components/icon/IconDictionary';

import styles from './styles.module.scss';
import { LinkTypes } from '../SidePanel';

type Props = {
  iconType: IconTypes;
  title: string;
  isActive?: boolean;
  to: string;
  setActiveTab?: (value: LinkTypes) => void;
};

export const SidePanelItem: React.FC<Props> = ({
  iconType,
  title,
  to,
  isActive = false,
  setActiveTab = () => {},
}) => {
  const cx = useStyles(styles);

  return (
    <ButtonLink
      to={`/${to}`}
      onClick={() => setActiveTab(to as LinkTypes)}
      className={cx('link')}
    >
      <div className={cx('container', isActive ? 'active' : '')}>
        <div className={cx('icon')}>
          <Icon type={iconType} />
        </div>
        <p className={cx('text')}>{title}</p>
      </div>
    </ButtonLink>
  );
};
