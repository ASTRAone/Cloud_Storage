import React from 'react';

import cn from 'classnames';  

import { dictionary, IconTypes } from './IconDictionary';
import { Size } from '../../utility/common';

import styles from './Icon.module.scss';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  type: IconTypes;
  size?: Size;
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

export const Icon: React.FC<Props> = ({ type, size = 'xxl', ...rest }) => {
  const Icon = dictionary[type]

  if (!Icon) return null;

  const classNameBySize = iconSizesDictionary[size];
  const classnames = cn(styles.icon, classNameBySize);

  return (
    <div className={classnames} {...rest}>
      <Icon />
    </div>
  )
};
