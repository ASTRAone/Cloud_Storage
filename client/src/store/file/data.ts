import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RequestStatus, UUID } from '@src/utility/common';

import { FileCreateDTO, FileResponse, FileUploadDTO } from '@api/FileApi/models';
import { FileApi } from '@api/FileApi';

import { statusFlags } from '@store/selectors';
import { RootState } from '@store/root';

type State = {
  file: FileResponse[] | [];
  dirStack: any[];
  needUpdate?: boolean;
  currentDir?: string;
  status: RequestStatus;
  statusCreate: RequestStatus;
  statusUpload: RequestStatus;
};

const initialState: State = {
  file: [],
  dirStack: [],
  needUpdate: false,
  currentDir: '',
  status: 'idle',
  statusCreate: 'idle',
  statusUpload: 'idle',
};

const fetchFiles = createAsyncThunk(
  'file/fetch',
  async (dirId: UUID | undefined, { rejectWithValue }) => {
    try {
      const response = await FileApi.fetchFiles(dirId);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const createFile = createAsyncThunk(
  'file/create',
  async (payload: FileCreateDTO, { rejectWithValue }) => {
    try {
      const response = await FileApi.createFile(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const uploadFile = createAsyncThunk(
  'file/upload',
  async (payload: FileUploadDTO, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    if (payload.parent) {
      formData.append('parent', payload.parent);
    }
    try {
      const response = await FileApi.uploadFile(formData);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const fileDataSlice = createSlice({
  name: 'fileDataSlice',
  initialState,
  reducers: {
    dropState: () => initialState,
    selectedDir: (state, action: PayloadAction<string | undefined>) => {
      state.currentDir = action.payload;
    },
    pushToStack: (state, action: PayloadAction<any>) => {
      state.dirStack = [...state.dirStack, action.payload];
    },
    popToStack: (state, action: PayloadAction<any>) => {
      state.dirStack = state.dirStack.filter((item) => item !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.file = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchFiles.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(createFile.pending, (state) => {
        state.statusCreate = 'loading';
        state.needUpdate = true;
      })
      .addCase(createFile.fulfilled, (state) => {
        state.statusCreate = 'idle';
        state.needUpdate = false;
      })
      .addCase(createFile.rejected, (state) => {
        state.statusCreate = 'failed';
        state.needUpdate = false;
      })

      .addCase(uploadFile.pending, (state) => {
        state.statusUpload = 'loading';
        state.needUpdate = true;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.statusUpload = 'idle';
        state.needUpdate = false;
      })
      .addCase(uploadFile.rejected, (state) => {
        state.statusUpload = 'failed';
        state.needUpdate = false;
      });
  },
});

const selectSelf = (state: RootState) => state.file.data;

const getFilesData = createSelector(selectSelf, ({ ...fileData }) => fileData);
const statusCreate = createSelector(selectSelf, ({ statusCreate }) => statusCreate);
const getCurrentDir = createSelector(selectSelf, ({ currentDir }) => currentDir);
const getStackDir = createSelector(selectSelf, ({ dirStack }) => dirStack);
const getStatus = createSelector(selectSelf, statusFlags);

export const { selectedDir, pushToStack, dropState, popToStack } = fileDataSlice.actions;

export {
  getFilesData,
  fetchFiles,
  getStatus,
  getCurrentDir,
  statusCreate,
  createFile,
  getStackDir,
  uploadFile,
};
export default fileDataSlice.reducer;
