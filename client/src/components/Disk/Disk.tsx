import React, { useEffect } from "react";
import { FileUploadDTO } from "../../api/FileApi/models";
import { usePopupControls } from "../../hooks/usePopupControls";
import { useStyles } from "../../hooks/useStyles";

import {
  fetchFiles,
  getCurrentDir,
  getFilesData,
  getStackDir,
  popToStack,
  selectedDir,
  uploadFile,
} from "../../store/file/data";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { Button } from "../Button";
import { FileList } from "../FileList";
import { Input } from "../Input";
import { ModalCreateFile } from "./components";

import styles from "./styles.module.scss";

export const Disk: React.FC = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const {currentDir, dirStack, needUpdate} = useAppSelector(getFilesData);
  const { isOpened, openPopup, closePopup } = usePopupControls();

  useEffect(() => {
    dispatch(fetchFiles(currentDir));
  }, [currentDir, needUpdate]);

  const goBack = () => {
    const newStackDir = [...dirStack];
    const backDirId = newStackDir.pop();
    dispatch(popToStack(backDirId));
    dispatch(selectedDir(newStackDir.pop()));
  };

  const submitUploadFile = (data: any) => {
    const files = [...data]
    files.forEach((file: any) => {
      dispatch(uploadFile({file, parent: currentDir}))
    })
    
  };

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("btns")}>
          {!!dirStack.length && (
            <Button className={cx("back")} text="Назад" onClick={goBack} />
          )}
          <Button
            variant="outline"
            onClick={openPopup}
            className={cx("create")}
            text="Создать папку"
          />
          <div className={cx("upload")}>
            <label htmlFor="upload" className={cx("label")}>
              Загрузить файл
            </label>
            <Input multiple={true} onChange={(e) => submitUploadFile(e.target.files)} type="file" id="upload" className={cx("input")} />
          </div>
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
