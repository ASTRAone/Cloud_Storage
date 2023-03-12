import React, { HTMLInputTypeAttribute } from "react";
import { useStyles } from "../../hooks/useStyles";

import styles from "./styles.module.scss";

type Props = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
};

export const Input: React.FC<Props> = ({ type = "text", placeholder = "" }) => {
  const cx = useStyles(styles);

  return (
    <div className={cx("container")}>
      <input type={type} className={cx("input")} placeholder={placeholder} />
    </div>
  );
};

export type { Props as InputProps };
