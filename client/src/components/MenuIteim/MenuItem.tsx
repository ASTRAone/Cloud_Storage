import React from 'react';

import { StorageService } from '@services/StorageService';

import { useStyles } from '@hooks/useStyles';

import { Button } from '@components/Button';
import { ButtonLink } from '@components/ButtonLink';
import { Icon } from '@components/icon';
import { IconTypes } from '@components/icon/IconDictionary';

import styles from './styles.module.scss';

const storageService = StorageService.getInstance();

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

  const onClickActiveLocation = () => {
    if (onClick !== undefined) {
      onClick();
    }
    storageService.setItem('activeLocationLC', url);
    storageService.removeItem('activeTabLC');
  };

  return (
    <>
      {button ? (
        <Button
          text={title}
          typeIcon={iconType}
          classNameContainer={cx(className)}
          onClick={onClick}
        />
      ) : (
        <ButtonLink
          to={`/${url}` || ''}
          className={cx('link', className)}
          onClick={onClickActiveLocation}
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
