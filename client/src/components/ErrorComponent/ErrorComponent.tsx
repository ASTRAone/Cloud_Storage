import React from "react";
import { useStyles } from "../../hooks/useStyles";

import styles from "./styles.module.scss";

type Props = {
  text: string;
};

export const ErrorComponent: React.FC<Props> = ({ text }) => {
  const cx = useStyles(styles);
  return (
    <div className={cx('container')}>
      <p className={cx('errorText')}>{text}</p>
    </div>
  );
};
