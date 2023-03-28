import {
  HideIcon,
  ShowIcon,
  Spinner,
  FolderIcon,
  FileIcon,
  CloseIcon,
  UserIcon,
  MailIcon,
  SecurityIcon,
} from '@assets/icons';

const dictionary = {
  hide: HideIcon,
  show: ShowIcon,
  spinner: Spinner,
  folder: FolderIcon,
  file: FileIcon,
  close: CloseIcon,
  user: UserIcon,
  mail: MailIcon,
  security: SecurityIcon,
};

type IconTypes = keyof typeof dictionary;

export { dictionary };
export type { IconTypes };
