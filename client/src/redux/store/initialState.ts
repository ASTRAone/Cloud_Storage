import { TRootState } from "../types/TRootState";

const initialState: TRootState = {
  user: {
    id: 0,
    diskSpace: 0,
    usedSpace: 0,
    email: "",
    isAuth: false,
    loading: false,
  },
  files: {
    data: [],
    currentDir: "",
    loading: false,
  },
  file: {
    currentDir: "",
    loading: false,
  },
};

export default initialState;
