import { TFIles } from "./TFIles";
import { TUser } from "./TUser";
import { TFIle } from "./TFile";

export type TRootState = {
  user: TUser;
  files: TFIles;
  file: TFIle;
};
