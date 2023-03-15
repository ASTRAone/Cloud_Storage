import React from "react";
import { useStyles } from "../../hooks/useStyles";
import { TFilesData } from "../../redux/types/TFIles";
import { customDate } from "../../utility/customDate";
import { Icon } from "../icon";

import styles from "./styles.module.scss";

type Props = {
  file: TFilesData;
};

export const File: React.FC<Props> = ({ file }) => {
  const { name, size, type, date } = file;
  const cx = useStyles(styles);
  return (
    <div className={cx("container")}>
      <Icon
        size="xl"
        type={type === "dir" ? "folder" : "file"}
        className={cx("img")}
      />
      <div className={cx("file-name")}>{name}</div>
      <div className={cx("file-date")}>{customDate(date)}</div>
      <div className={cx("file-size")}>{size}</div>
    </div>
  );
};
