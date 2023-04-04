import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';
import { IconTypes } from '@components/icon/IconDictionary';
import { Button } from '@components/Button';

import styles from './styles.module.scss';

type Props = {
  iconType?: IconTypes;
  className?: string;
  name: string;
  url?: string;
  noLink?: boolean;
};

export const MenuItem: React.FC<Props> = ({
  iconType = null,
  name,
  url,
  className,
  noLink = false,
}) => {
  const cx = useStyles(styles);
  return (
    <>
      {iconType !== null && (
        <Icon
          type={iconType}
          className={cx('icon')}
        />
      )}
      {!noLink ? (
        <ButtonLink
          text={name}
          to={url || ''}
          className={className}
        />
      ) : (
        <Button
          text={name}
          className={className}
        />
      )}
    </>
  );
};
