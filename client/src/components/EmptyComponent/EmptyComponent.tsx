import React from "react";
import { useStyles } from "../../hooks/useStyles";

import styles from "./styles.module.scss";

export const EmptyComponent: React.FC = () => {
  const cx = useStyles(styles);
  return <div className={cx("container")}>Пока ничего нет</div>;
};
