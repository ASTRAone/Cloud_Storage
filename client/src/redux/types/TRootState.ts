import { TFIle } from "./TFIle";
import { TUser } from "./TUser"

export type TRootState = {
  user: TUser;
  file: TFIle;
}