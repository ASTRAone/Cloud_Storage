import { useState } from "react";

export type PopupControls = {
  isOpened: boolean;
  openPopup: () => void;
  closePopup: () => void;
  togglePopup: () => void;
};

const usePopupControls = (value = false): PopupControls => {
  const [isOpened, setIsOpened] = useState(value);

  const openPopup = () => setIsOpened(true);
  const closePopup = () => setIsOpened(false);
  const togglePopup = () => setIsOpened(!isOpened);

  return { isOpened, openPopup, closePopup, togglePopup };
};

export { usePopupControls };
