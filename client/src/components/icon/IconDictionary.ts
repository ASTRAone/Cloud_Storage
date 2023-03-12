import { HideIcon, ShowIcon } from "../../assets/icons";

const dictionary = {
  hide: HideIcon,
  show: ShowIcon,
};

type IconTypes = keyof typeof dictionary;

export { dictionary };
export type { IconTypes };
