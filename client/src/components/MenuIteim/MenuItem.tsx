import React from 'react';

import { useStyles } from '@hooks/useStyles';

import { Button } from '@components/Button';
import { ButtonLink } from '@components/ButtonLink';
import { Icon } from '@components/icon';
import { IconTypes } from '@components/icon/IconDictionary';

import styles from './styles.module.scss';

type Props = {
  iconType?: IconTypes;
  className?: string;
  title: string;
  onClick?: () => void;
  url?: string;
  button?: boolean;
};

export const MenuItem: React.FC<Props> = ({
  iconType = 'default',
  title,
  url,
  onClick = () => {},
  className,
  button = false,
}) => {
  const cx = useStyles(styles);
  return (
    <>
      {button ? (
        <Button
          text={title}
          typeIcon={iconType}
          className={className}
        />
      ) : (
        <ButtonLink
          to={url || ''}
          className={className}
          onClick={onClick}
        >
          <div className={cx('container-child-buttonlink')}>
            <div className={cx('icon')}>
              <Icon type={iconType} />
            </div>
            <p className={cx('text')}>{title}</p>
          </div>
        </ButtonLink>
      )}
    </>
  );
};
