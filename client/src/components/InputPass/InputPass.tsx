import React, { useState } from "react";
import { Input } from "../Input/Input";
import { useStyles } from "../../hooks/useStyles";

import { InputProps } from "../Input/Input";
import styles from "./styles.module.scss";
import { Icon } from "../icon";

export const InputPass: React.FC<InputProps> = ({ placeholder }) => {
  const cx = useStyles(styles);
  const [show, setShow] = useState(false);

  const showPass = () => setShow(true);
  const hidePass = () => setShow(false);

  return (
    <div className={cx("container")}>
      <Input type={show ? "text" : "password"} placeholder={placeholder} />
      <Icon
        className={cx("icon")}
        size="lg"
        type={show ? "hide" : "show"}
        onClick={show ? hidePass : showPass}
      />
    </div>
  );
};
