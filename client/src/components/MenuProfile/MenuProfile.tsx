import React, { useEffect, useState } from 'react';

import { useStyles } from '@hooks/useStyles';

import { DropDownMenu } from '@components/DropDownMenu';

import styles from './styles.module.scss';

type Props = { name: string; email: string; className?: string };

export const MenuProfile: React.FC<Props> = ({ name, email }) => {
  const cx = useStyles(styles);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);
  const handleRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (event: any) => {
      if (isMenuOpen && handleRef.current && !handleRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isMenuOpen]);

  return (
    <div
      className={cx('container')}
      onClick={toggleMenu}
      ref={handleRef}
    >
      <div className={cx('half-circle')} />
      <div className={cx('avatar')} />
      <div className={cx('information')}>
        <div className={cx('name')}>{name}</div>
        <div className={cx('email')}>{email}</div>
      </div>
      {isMenuOpen ? <DropDownMenu /> : null}
    </div>
  );
};
