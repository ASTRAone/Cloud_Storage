import React from 'react';

import cn from 'classnames';

import { Size } from '@src/utility/common';

import styles from './Icon.module.scss';
import { dictionaryFormat, IconFormatTypes } from './IconFormatDictionary';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  type: IconFormatTypes;
  size?: Size;
  color?: string;
};

const iconSizesDictionary: Record<Size, string> = {
  xs: styles.icon_xs,
  sm: styles.icon_sm,
  md: styles.icon_md,
  lg: styles.icon_lg,
  xl: styles.icon_xl,
  xxl: styles.icon_xxl,
  xxxl: styles.icon_xxxl,
};

export const IconFormat: React.FC<Props> = ({ type, size = 'lg', className, ...rest }) => {
  const Icon = dictionaryFormat[type];

  if (!Icon) return null;

  const classNameBySize = iconSizesDictionary[size];
  const classnames = cn(styles.icon, className, classNameBySize);

  return (
    <div
      className={classnames}
      {...rest}
    >
      <Icon />
    </div>
  );
};
