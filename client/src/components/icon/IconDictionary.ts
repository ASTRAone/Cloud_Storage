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
  MoonIcon,
  HeartIcon,
  ShapeIcon,
  SharedIcon,
  RequestIcon,
  DashboardIcon,
  StockholmIcon,
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
  moon: MoonIcon,
  heart: HeartIcon,
  shape: ShapeIcon,
  shared: SharedIcon,
  request: RequestIcon,
  dashboard: DashboardIcon,
  stockholm: StockholmIcon,
};

type IconTypes = keyof typeof dictionary;

export { dictionary };
export type { IconTypes };
