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
  ArrowIcon,
  BellIcon,
  MagnifierIcon,
  ArrowDownIcon,
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
  arrow: ArrowIcon,
  bell: BellIcon,
  magnifier: MagnifierIcon,
  arrowDown: ArrowDownIcon,
};

type IconTypes = keyof typeof dictionary;

export { dictionary };
export type { IconTypes };
