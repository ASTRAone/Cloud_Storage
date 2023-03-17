import React, { useEffect } from "react";
import { usePopupControls } from "../../hooks/usePopupControls";
import { useStyles } from "../../hooks/useStyles";

import { files } from "../../redux/actions/file.action";
import {
  useAppDispatch,
  useSelector,
} from "../../redux/store/configurationStore";

import { Button } from "../Button";
import { FileList } from "../FileList";
import { ModalCreateFile } from "./components";

import styles from "./styles.module.scss";

export const Disk: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { currentDir, data } = useSelector((store) => store.files);
  const { isOpened, openPopup, closePopup } = usePopupControls();

  useEffect(() => {
    dispatch(files(currentDir));
  }, [currentDir]);

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("btns")}>
          <Button className={cx("back")} text="Назад" />
          <Button
            variant="outline"
            onClick={openPopup}
            className={cx("create")}
            text="Создать папку"
          />
        </div>
        <FileList />
      </div>
      {isOpened && (
        <ModalCreateFile
          isOpen={isOpened}
          closeModal={closePopup}
          currentDir={currentDir}
        />
      )}
    </>
  );
};
