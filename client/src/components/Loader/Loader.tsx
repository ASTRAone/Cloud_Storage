import React from 'react'
import { useStyles } from '../../hooks/useStyles'

import styles from './styles.module.scss'
import { Icon } from '../icon'

export const Loader: React.FC = () => {
  const cx = useStyles(styles)
  return <Icon type="spinner" className={cx('loader')} />
}