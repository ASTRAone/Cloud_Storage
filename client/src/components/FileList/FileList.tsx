import React from "react";
import { useStyles } from "../../hooks/useStyles";
import { getFilesData } from "../../store/file/data";
import { useAppSelector } from "../../store/hooks";

import { File } from "../File/File";

import styles from "./styles.module.scss";

export const FileList: React.FC = () => {
  const cx = useStyles(styles);
  const { file } = useAppSelector(getFilesData);

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("sort-name")}>Название</div>
        <div className={cx("sort-date")}>Дата</div>
        <div className={cx("sort-size")}>Размер</div>
      </div>
      {file ? file?.map((item) => (
        <File file={item} key={item._id} />
      )) : null}
    </div>
  );
};
