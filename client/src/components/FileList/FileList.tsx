import React from "react";
import { useStyles } from "../../hooks/useStyles";
import { useSelector } from "../../redux/store/configurationStore";

import { File } from "../File/File";

import styles from "./styles.module.scss";

export const FileList: React.FC = () => {
  const cx = useStyles(styles);
  const { data } = useSelector((store) => store.files);

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("sort-name")}>Название</div>
        <div className={cx("sort-date")}>Дата</div>
        <div className={cx("sort-size")}>Размер</div>
      </div>
      {data?.map((item) => (
        <File file={item} key={item._id} />
      ))}
    </div>
  );
};
