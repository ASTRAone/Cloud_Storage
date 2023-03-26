import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/root';
import { statusFlags } from '@store/selectors';

import { RequestStatus } from '@src/utility/common';

import { AuthDTO, AuthRegDTO, AuthViewDTO } from '@api/AuthApi/models';
import { AuthApi } from '@api/AuthApi';

type State = {
  user: AuthViewDTO | null;
  status: RequestStatus;
  statusReg: RequestStatus;
  statusLogout: RequestStatus;
  statusAuth: RequestStatus;
};

const initialState: State = {
  user: null,
  status: 'idle',
  statusReg: 'idle',
  statusLogout: 'idle',
  statusAuth: 'idle',
};

const userLogin = createAsyncThunk('user/login', async (payload: AuthDTO, { rejectWithValue }) => {
  try {
    const response = await AuthApi.autorization(payload);
    return response.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

const userRegistration = createAsyncThunk(
  'user/registration',
  async (payload: AuthRegDTO, { rejectWithValue }) => {
    try {
      const response = await AuthApi.registration(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const userReload = createAsyncThunk('user/refresh', async (_, { rejectWithValue }) => {
  try {
    const response = await AuthApi.reload();
    return response.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

const userLogout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await AuthApi.logout();
    return response.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

const userDataSlice = createSlice({
  name: 'userDataSlice',
  initialState,
  reducers: {
    dropState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        if (state.user) {
          state.user.isAuth = true;
        }
        state.status = 'idle';
      })
      .addCase(userLogin.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(userRegistration.pending, (state) => {
        state.statusReg = 'loading';
      })
      .addCase(userRegistration.fulfilled, (state) => {
        state.statusReg = 'idle';
      })
      .addCase(userRegistration.rejected, (state) => {
        state.statusReg = 'failed';
      })

      .addCase(userReload.pending, (state) => {
        state.statusAuth = 'loading';
      })
      .addCase(userReload.fulfilled, (state, action) => {
        state.user = action.payload;
        if (state.user) {
          state.user.isAuth = true;
        }
        state.statusAuth = 'idle';
      })
      .addCase(userReload.rejected, (state) => {
        if (state.user?.isAuth) {
          state.user.isAuth = false;
        }
        state.statusAuth = 'failed';
      })

      .addCase(userLogout.pending, (state) => {
        state.statusLogout = 'loading';
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.statusLogout = 'idle';
        state.user = null;
      })
      .addCase(userLogout.rejected, (state) => {
        state.statusLogout = 'failed';
        if (state.user?.isAuth) {
          state.user.isAuth = false;
        }
      });
  },
});

const selectSelf = (state: RootState) => state.user.data;

const getUserData = createSelector(selectSelf, ({ ...userData }) => userData);
const getStatus = createSelector(selectSelf, statusFlags);

export const { dropState } = userDataSlice.actions;

export {
  userDataSlice,
  getUserData,
  getStatus,
  userLogin,
  userReload,
  userRegistration,
  userLogout,
};
export default userDataSlice.reducer;
