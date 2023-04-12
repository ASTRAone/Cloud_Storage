import React from 'react';

import cn from 'classnames';
import { ColorFolder } from '@utils/contants';

import { Size } from '@src/utility/common';

import styles from './Icon.module.scss';
import { dictionary, IconTypes } from './IconDictionary';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  type: IconTypes;
  size?: Size;
  color?: string;
};

export const dictionaryColorFolder: Record<string, ColorFolder> = {
  music: ColorFolder.music,
  documents: ColorFolder.documents,
  films: ColorFolder.films,
  images: ColorFolder.images,
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

export const Icon: React.FC<Props> = ({ type, size = 'lg', className, ...rest }) => {
  const Icon = dictionary[type];

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
