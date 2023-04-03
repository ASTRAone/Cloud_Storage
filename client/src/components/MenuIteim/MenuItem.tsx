import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Icon } from '@components/icon';
import { ButtonLink } from '@components/ButtonLink';
import { IconTypes } from '@components/icon/IconDictionary';
import { Button } from '@components/Button';

import styles from './styles.module.scss';

type Props = {
  iconType: IconTypes;
  className: string;
  name: string;
  url?: string;
  noLink?: boolean;
};

export const MenuItem: React.FC<Props> = ({ iconType, name, url, className, noLink = false }) => {
  const cx = useStyles(styles);
  return (
    <>
      <Icon
        type={iconType}
        className={cx('icon')}
      />
      {!noLink ? (
        <ButtonLink
          text={name}
          to={url || ''}
          className={className}
        />
      ) : (
        <Button
          typeIcon={iconType}
          text={name}
          className={className}
        />
      )}
    </>
  );
};
