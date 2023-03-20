import React, { useState } from "react";
import { Input } from "../Input/Input";
import { useStyles } from "../../hooks/useStyles";

import { InputProps } from "../Input/Input";
import { Icon } from "../icon";

import styles from "./styles.module.scss";

export const InputPass: React.FC<InputProps> = ({
  placeholder,
  error,
  ...rest
}) => {
  const cx = useStyles(styles);
  const [show, setShow] = useState(false);

  const showPass = () => setShow(true);
  const hidePass = () => setShow(false);

  return (
    <div className={cx("container")}>
      <Input
        error={error}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...rest}
      />
      <Icon
        className={cx("icon")}
        size="lg"
        type={show ? "hide" : "show"}
        onClick={show ? hidePass : showPass}
      />
    </div>
  );
};
