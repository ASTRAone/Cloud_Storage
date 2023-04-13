import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RequestStatus, UUID } from '@src/utility/common';

import {
  FileCreateDTO,
  FileResponse,
  FileUploadDTO,
  FileResponseRecently,
} from '@api/FileApi/models';
import { FileApi } from '@api/FileApi';

import { statusFlags } from '@store/selectors';
import { RootState } from '@store/root';

type State = {
  file: FileResponse[] | [];
  dirStack: any[];
  dataRecently: FileResponseRecently[];
  needUpdate?: boolean;
  currentDir?: string;
  status: RequestStatus;
  statusCreate: RequestStatus;
  statusUpload: RequestStatus;
  statusDownload: RequestStatus;
  statusDelete: RequestStatus;
  statusFetchRecently: RequestStatus;
  view: 'list' | 'plate';
};

const initialState: State = {
  file: [],
  dirStack: [],
  dataRecently: [],
  needUpdate: false,
  currentDir: '',
  status: 'idle',
  statusCreate: 'idle',
  statusUpload: 'idle',
  statusDownload: 'idle',
  statusDelete: 'idle',
  statusFetchRecently: 'idle',
  view: 'list',
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

const viewFiles = createAsyncThunk(
  'file/view',
  async (view: 'list' | 'plate', { rejectWithValue }) => {
    try {
      return view;
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

const downloadFile = createAsyncThunk(
  'file/download',
  async (payload: FileResponse, { rejectWithValue }) => {
    try {
      const response = await FileApi.downloadFile(payload._id);
      if (response.status === 200) {
        const blob = new Blob([response.data]);
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = payload.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const deleteFile = createAsyncThunk(
  'file/delete',
  async (payload: FileResponse, { rejectWithValue }) => {
    try {
      const response = await FileApi.deleteFile(payload._id);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const fetchRecentlyUploaded = createAsyncThunk(
  'file/fetchRecentlyUploaded',
  async (_, { rejectWithValue }) => {
    try {
      const response = await FileApi.fetchRecentlyUploaded();
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
    viewFolder: (state, action: PayloadAction<'list' | 'plate'>) => {
      state.view = action.payload;
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
      .addCase(viewFiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(viewFiles.fulfilled, (state, action) => {
        state.status = 'idle';
        state.view = action.payload;
      })
      .addCase(viewFiles.rejected, (state) => {
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
      })

      .addCase(downloadFile.pending, (state) => {
        state.statusDownload = 'loading';
        state.needUpdate = true;
      })
      .addCase(downloadFile.fulfilled, (state) => {
        state.statusDownload = 'idle';
        state.needUpdate = false;
      })
      .addCase(downloadFile.rejected, (state) => {
        state.statusDownload = 'failed';
        state.needUpdate = false;
      })

      .addCase(deleteFile.pending, (state) => {
        state.statusDelete = 'loading';
        state.needUpdate = true;
      })
      .addCase(deleteFile.fulfilled, (state) => {
        state.statusDelete = 'idle';
        state.needUpdate = false;
      })
      .addCase(deleteFile.rejected, (state) => {
        state.statusDelete = 'failed';
        state.needUpdate = false;
      })

      .addCase(fetchRecentlyUploaded.pending, (state) => {
        state.statusFetchRecently = 'loading';
        state.needUpdate = true;
      })
      .addCase(fetchRecentlyUploaded.fulfilled, (state, action) => {
        state.statusFetchRecently = 'idle';
        state.dataRecently = action.payload;
        state.needUpdate = false;
      })
      .addCase(fetchRecentlyUploaded.rejected, (state) => {
        state.statusFetchRecently = 'failed';
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
const setViewFolders = createSelector(selectSelf, ({ ...view }) => view);
const getRecentlyUploaded = createSelector(selectSelf, ({ ...dataRecently }) => dataRecently);

export const { selectedDir, pushToStack, dropState, popToStack, viewFolder } =
  fileDataSlice.actions;

export {
  getFilesData,
  fetchFiles,
  getStatus,
  getCurrentDir,
  statusCreate,
  createFile,
  getStackDir,
  uploadFile,
  downloadFile,
  deleteFile,
  setViewFolders,
  fetchRecentlyUploaded,
  getRecentlyUploaded,
};
export default fileDataSlice.reducer;
