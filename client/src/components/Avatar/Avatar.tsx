import React from "react";
import { useStyles } from "../../hooks/useStyles";

import styles from "./styles.module.scss";

type Props = {
  src?: string;
  fullName: string;
}

export const Avatar: React.FC<Props> = ({src}) => {
  const cx = useStyles(styles);
  // TODO: использовать Poper Meterial UI
  return (
    <div className={cx("container")}>
      {src && <img src="" alt="avatar" className={cx("avatar")} />}
      <p className={cx("name")}>Смирнов В.В.</p>
    </div>
  );
};
