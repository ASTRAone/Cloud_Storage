import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { RequestStatus } from '@src/utility/common';

import { AuthDTO, AuthRegDTO, AuthViewDTO } from '@api/AuthApi/models';
import { AuthApi } from '@api/AuthApi';

import { statusFlags } from '@store/selectors';
import { RootState } from '@store/root';

type State = {
  userData: AuthViewDTO;
  status: RequestStatus;
  statusReg: RequestStatus;
  statusUserData: RequestStatus;
  statusLogout: RequestStatus;
  statusAuth: RequestStatus;
  statusAvatar: RequestStatus;
  statusUpdateProfile: RequestStatus;
  needUpdate: boolean;
};

const initialState: State = {
  userData: {},
  needUpdate: false,
  status: 'idle',
  statusUserData: 'idle',
  statusReg: 'idle',
  statusLogout: 'idle',
  statusUpdateProfile: 'idle',
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
  async (file: File, { rejectWithValue }) => {
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

const userUpdateProfile = createAsyncThunk(
  'user/userUpdateProfile',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await AuthApi.updateProfile(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const fetchUserData = createAsyncThunk('user/userData', async (_, { rejectWithValue }) => {
  try {
    const response = await AuthApi.userData();
    return response.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

// TODO добавить апи на получение данных о юзере
const userDataSlice = createSlice({
  name: 'userDataSlice',
  initialState,
  reducers: {
    dropState: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUserData.pending, (state) => {
        state.statusUserData = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.needUpdate = false;
        state.userData = action.payload;
        state.statusUserData = 'idle';
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.statusUserData = 'failed';
      })

      .addCase(userLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userLogin.fulfilled, (state) => {
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

      .addCase(userLogout.pending, (state) => {
        state.statusLogout = 'loading';
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.statusLogout = 'idle';
        state.userData = {};
      })
      .addCase(userLogout.rejected, (state) => {
        state.statusLogout = 'failed';
      })

      .addCase(userUploadAvatar.pending, (state) => {
        state.statusAvatar = 'loading';
      })
      .addCase(userUploadAvatar.fulfilled, (state) => {
        state.statusAvatar = 'idle';
        state.needUpdate = true;
      })
      .addCase(userUploadAvatar.rejected, (state) => {
        state.statusAvatar = 'failed';
      })

      .addCase(userUpdateProfile.pending, (state) => {
        state.statusUpdateProfile = 'loading';
      })
      .addCase(userUpdateProfile.fulfilled, (state, action) => {
        state.needUpdate = true;
        state.userData = action.payload;
        state.statusUpdateProfile = 'idle';
      })
      .addCase(userUpdateProfile.rejected, (state) => {
        state.statusUpdateProfile = 'failed';
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
  userRegistration,
  userLogout,
  userUploadAvatar,
  userUpdateProfile,
  fetchUserData,
};
export default userDataSlice.reducer;
