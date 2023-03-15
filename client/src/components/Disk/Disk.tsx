import React, { useEffect } from "react";
import { useStyles } from "../../hooks/useStyles";
import { files } from "../../redux/actions/file.action";
import {
  useAppDispatch,
  useSelector,
} from "../../redux/store/configurationStore";
import { Button } from "../Button";
import { FileList } from "../FileList";

import styles from "./styles.module.scss";

export const Disk: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { currentDir, data } = useSelector((store) => store.files);
  console.log("cur", currentDir, "data", data);

  useEffect(() => {
    dispatch(files(currentDir));
  }, [currentDir]);

  return (
    <div className={cx("container")}>
      <div className={cx("btns")}>
        <Button className={cx("back")} text="Назад" />
        <Button variant="outline" className={cx("create")} text="Создать папку" />
      </div>
      <FileList />
    </div>
  );
};
