import {
  HideIcon,
  ShowIcon,
  Spinner,
  FolderIcon,
  FileIcon,
} from "../../assets/icons";

const dictionary = {
  hide: HideIcon,
  show: ShowIcon,
  spinner: Spinner,
  folder: FolderIcon,
  file: FileIcon,
};

type IconTypes = keyof typeof dictionary;

export { dictionary };
export type { IconTypes };
