import React from "react";
import { useStyles } from "../../hooks/useStyles";

import styles from "./styles.module.scss";

type Props = {
  text: string;
  className?: string;
};

export const ErrorComponent: React.FC<Props> = ({ text, className }) => {
  const cx = useStyles(styles);
  return (
    <div className={cx('container', className)}>
      <p className={cx('errorText')}>{text}</p>
    </div>
  );
};
