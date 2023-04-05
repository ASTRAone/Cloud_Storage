import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { RequestStatus } from '@src/utility/common';

import { AuthDTO, AuthRegDTO, AuthViewDTO } from '@api/AuthApi/models';
import { AuthApi } from '@api/AuthApi';

import { statusFlags } from '@store/selectors';
import { RootState } from '@store/root';

type State = {
  user: AuthViewDTO | null;
  status: RequestStatus;
  statusReg: RequestStatus;
  statusLogout: RequestStatus;
  statusAuth: RequestStatus;
  statusAvatar: RequestStatus;
};

const initialState: State = {
  user: null,
  status: 'idle',
  statusReg: 'idle',
  statusLogout: 'idle',
  statusAuth: 'idle',
  statusAvatar: 'idle',
};

const userLogin = createAsyncThunk('user/login', async (payload: AuthDTO, { rejectWithValue }) => {
  try {
    const response = await AuthApi.autorization(payload);
    return response.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

// const userLanguage = createAsyncThunk(
//   'user/language',
//   async (payload: AuthDTO, { rejectWithValue }) => {
//     try {
//       const response = await AuthApi.changeLanguage(payload);
//       return response;
//     } catch (e) {
//       return rejectWithValue(e);
//     }
//   },
// );

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

const userUploadAvatar = createAsyncThunk(
  'user/uploadAvatar',
  async (file: any, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await AuthApi.uploadAvatar(formData);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

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
      })

      .addCase(userUploadAvatar.pending, (state) => {
        state.statusAvatar = 'loading';
      })
      .addCase(userUploadAvatar.fulfilled, (state) => {
        state.statusAvatar = 'idle';
      })
      .addCase(userUploadAvatar.rejected, (state) => {
        state.statusAvatar = 'failed';
      });
    // .addCase(userLanguage.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(userLanguage.fulfilled, (state, action) => {
    //   state.user = action.payload;
    //   if (state.user) {
    //     state.user.language = 'ru-RU';
    //   }
    //   state.status = 'idle';
    // })
    // .addCase(userLanguage.rejected, (state) => {
    //   state.status = 'failed';
    // });
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
  userUploadAvatar,
};
export default userDataSlice.reducer;
