import React, { useEffect } from "react";
import { usePopupControls } from "../../hooks/usePopupControls";
import { useStyles } from "../../hooks/useStyles";

import { fetchFiles, getCurrentDir } from "../../store/file/data";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { Button } from "../Button";
import { FileList } from "../FileList";
import { ModalCreateFile } from "./components";

import styles from "./styles.module.scss";

export const Disk: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector(getCurrentDir)
  const { isOpened, openPopup, closePopup } = usePopupControls();

  useEffect(() => {
    dispatch(fetchFiles(currentDir));
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
        {/* <FileList /> */}
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
