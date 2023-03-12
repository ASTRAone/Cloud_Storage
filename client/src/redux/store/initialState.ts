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
  file: {},
};

export default initialState;
