import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AuthApi } from "../../api/AuthApi";
import { AuthDTO, AuthResponse } from "../../api/AuthApi/models";
import { RequestStatus } from "../../utility/common";
import { RootState } from "../root";

import { statusFlags } from "../selectors";

type State = {
  user: AuthResponse | null;
  status: RequestStatus;
  statusReg: RequestStatus;
};

const initialState: State = {
  user: null,
  status: "idle",
  statusReg: "idle",
};

const userLogin = createAsyncThunk(
  "user/login",
  async (payload: AuthDTO, { rejectWithValue }) => {
    console.log('pay', payload)
    try {
      const response = await AuthApi.autorization(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const userRegistration = createAsyncThunk(
  "user/registration",
  async (payload: AuthDTO, { rejectWithValue }) => {
    try {
      const response = await AuthApi.registration();
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const userDataSlice = createSlice({
  name: "userDataSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log('user', action.payload)
        state.status = "idle";
      })
      .addCase(userLogin.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(userRegistration.pending, (state) => {
        state.statusReg = "loading";
      })
      .addCase(userRegistration.fulfilled, (state) => {
        state.statusReg = "idle";
      })
      .addCase(userRegistration.rejected, (state) => {
        state.statusReg = "failed";
      });
  },
});

const selectSelf = (state: RootState) => state.user.data;

const getUserData = createSelector(
  selectSelf,
  ({ status, ...userData }) => userData
);
const getStatus = createSelector(selectSelf, statusFlags);

export { userDataSlice, getUserData, userLogin, getStatus };
export default userDataSlice.reducer;
