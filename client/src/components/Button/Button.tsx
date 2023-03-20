import React from "react";
import { useStyles } from "../../hooks/useStyles";

import { Icon } from "../icon";
import { Size } from "../../utility/common";
import { IconTypes } from "../icon/IconDictionary";

import styles from "./styles.module.scss";
import { Loader } from "../Loader";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ligth" | "outline" | "empty";
  isIcon?: boolean;
  typeIcon?: IconTypes;
  sizeIcon?: Size;
  isLoading?: boolean;
  text?: string;
  className?: string;
};

export const Button: React.FC<Props> = ({
  variant = "ligth",
  isIcon,
  typeIcon,
  sizeIcon,
  className,
  isLoading = false,
  text,
  ...restProps
}) => {
  const cx = useStyles(styles);

  return (
    <button className={cx("btn", className, variant)} {...restProps}>
      {isLoading ? <Loader /> : text}
      {isIcon && typeIcon && <Icon type={typeIcon} size={sizeIcon} />}
    </button>
  );
};
