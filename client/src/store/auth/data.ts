import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AuthApi } from "../../api/AuthApi";
import { AuthDTO, AuthRegDTO, AuthViewDTO } from "../../api/AuthApi/models";
import { RequestStatus } from "../../utility/common";
import { RootState } from "../root";

import { statusFlags } from "../selectors";

type State = {
  user: AuthViewDTO | null;
  status: RequestStatus;
  statusReg: RequestStatus;
  statusLogout: RequestStatus;
  statusAuth: RequestStatus;
};

const initialState: State = {
  user: null,
  status: "idle",
  statusReg: "idle",
  statusLogout: "idle",
  statusAuth: "idle",
};

const userLogin = createAsyncThunk(
  "user/login",
  async (payload: AuthDTO, { rejectWithValue }) => {
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
  async (payload: AuthRegDTO, { rejectWithValue }) => {
    try {
      const response = await AuthApi.registration(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const userAuth = createAsyncThunk(
  "user/auth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthApi.auth();
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const userLogout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthApi.logout();
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
        state.user = action.payload.user;
        state.user.isAuth = true;
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
      })

      .addCase(userAuth.pending, (state) => {
        state.statusAuth = "loading";
      })
      .addCase(userAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.user.isAuth = true;
        state.statusAuth = "idle";
      })
      .addCase(userAuth.rejected, (state) => {
        state.statusAuth = "failed";
      })

      .addCase(userLogout.pending, (state) => {
        state.statusLogout = "loading";
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.statusLogout = "idle";
        if (state.user?.isAuth) {
          state.user.isAuth = false;
        }
      })
      .addCase(userLogout.rejected, (state) => {
        state.statusLogout = "failed";
        if (state.user?.isAuth) {
          state.user.isAuth = false;
        }
      });
  },
});

const selectSelf = (state: RootState) => state.user.data;

const getUserData = createSelector(selectSelf, ({ ...userData }) => userData);
const getStatus = createSelector(selectSelf, statusFlags);

export {
  userDataSlice,
  getUserData,
  userLogin,
  getStatus,
  userAuth,
  userRegistration,
  userLogout,
};
export default userDataSlice.reducer;
