import {
  HideIcon,
  ShowIcon,
  Spinner,
  FolderIcon,
  FileIcon,
  CloseIcon,
} from "../../assets/icons";

const dictionary = {
  hide: HideIcon,
  show: ShowIcon,
  spinner: Spinner,
  folder: FolderIcon,
  file: FileIcon,
  close: CloseIcon,
};

type IconTypes = keyof typeof dictionary;

export { dictionary };
export type { IconTypes };
