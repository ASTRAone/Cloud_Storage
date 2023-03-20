import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { useStyles } from "../../hooks/useStyles";

import styles from "./styles.module.scss";

// TODO Сделать варианты цвета пропсами

type Props = NavLinkProps & { to: string; text: string; className?: string };

export const ButtonLink: React.FC<Props> = ({
  to,
  text,
  className,
  ...rest
}) => {
  const cx = useStyles(styles);

  return (
    <div className={cx("container")}>
      <NavLink to={to} className={cx(className, "link" )} {...rest}>
        {text}
      </NavLink>
    </div>
  );
};
