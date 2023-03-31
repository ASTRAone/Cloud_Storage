import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';
import { IconTypes } from '@components/icon/IconDictionary';

import styles from './styles.module.scss';

type Props = {
  iconType?: IconTypes;
  classNameIcon?: string;
  classNameLink?: string;
  to: string;
  linkName: string;
};

export const ItemMenu: React.FC<Props> = ({
  iconType,
  to,
  linkName,
  classNameIcon,
  classNameLink,
}) => {
  const cx = useStyles(styles);

  return (
    <div className={cx('containerLink')}>
      {iconType && (
        <Icon
          type={iconType}
          className={classNameIcon}
        />
      )}
      <ButtonLink
        text={linkName}
        to={to}
        className={classNameLink}
      />
    </div>
  );
};

export type { Props as InputProps };
