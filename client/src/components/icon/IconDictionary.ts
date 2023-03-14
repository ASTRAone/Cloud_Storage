import { HideIcon, ShowIcon, Spinner } from "../../assets/icons";

const dictionary = {
  hide: HideIcon,
  show: ShowIcon,
  spinner: Spinner,
};

type IconTypes = keyof typeof dictionary;

export { dictionary };
export type { IconTypes };
