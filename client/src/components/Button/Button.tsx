import React from "react";
import { useStyles } from "../../hooks/useStyles";

import { Icon } from "../icon";
import { Size } from "../../utility/common";
import { IconTypes } from "../icon/IconDictionary";

import styles from "./styles.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ligth" | "painted" | "empty";
  isIcon?: boolean;
  typeIcon?: IconTypes;
  sizeIcon?: Size;
  text?: string;
  className?: string;
};

export const Button: React.FC<Props> = ({
  variant = "ligth",
  isIcon,
  typeIcon,
  sizeIcon,
  className,
  text,
  ...restProps
}) => {
  const cx = useStyles(styles);

  return (
    <button className={cx("btn", variant)} {...restProps}>
      {text}
      {isIcon && typeIcon && <Icon type={typeIcon} size={sizeIcon} />}
    </button>
  );
};
