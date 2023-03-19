import React from "react";
import { useStyles } from "../../hooks/useStyles";

import styles from "./styles.module.scss";

type Props = Partial<React.ComponentPropsWithRef<"input">> & {
  error?: any;
};

export const Input: React.FC<Props> = ({
  type = "text",
  placeholder = "",
  value,
  error,
  onChange,
  ...rest
}) => {
  const cx = useStyles(styles);
  const isError = !!error;

  return (
    <div className={cx("container", isError && 'error')}>
      <input
        type={type}
        className={cx("input")}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export type { Props as InputProps };
