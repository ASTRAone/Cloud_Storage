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

interface Stack {
  name: string;
  dirId: string;
}

type State = {
  file: FileResponse[] | [];
  dataRecently: FileResponseRecently[];
  needUpdate: boolean;
  dirStack: string[];
  currentDir?: string;
  breadCrumbsStack: Stack[];
  status: RequestStatus;
  statusCreate: RequestStatus;
  statusUpload: RequestStatus;
  statusDownload: RequestStatus;
  statusDelete: RequestStatus;
  statusViewFiles: RequestStatus;
  statusFetchRecently: RequestStatus;
  view: 'list' | 'plate';
};

const initialState: State = {
  file: [],
  dirStack: [],
  dataRecently: [],
  needUpdate: false,
  currentDir: '',
  breadCrumbsStack: [],
  status: 'idle',
  statusCreate: 'idle',
  statusUpload: 'idle',
  statusDownload: 'idle',
  statusViewFiles: 'idle',
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
    pushBreadcrumbsStack: (state, action: PayloadAction<Stack>) => {
      state.breadCrumbsStack = [...state.breadCrumbsStack, action.payload];
    },
    popBreadcrumbsStack: (state, action: PayloadAction<any>) => {
      const spliced = [...state.breadCrumbsStack].splice(
        action.payload.index + 1,
        state.breadCrumbsStack.length - action.payload.index,
      );
      state.breadCrumbsStack =
        [...state.breadCrumbsStack].filter((x) => spliced.indexOf(x) === -1) || [];
    },
    clearBeadcrumbsStack: (state) => {
      state.breadCrumbsStack = [];
      state.currentDir = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.status = 'loading';
        state.needUpdate = true;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.file = action.payload;
        state.status = 'idle';
        state.needUpdate = false;
      })
      .addCase(fetchFiles.rejected, (state) => {
        state.status = 'failed';
        state.needUpdate = false;
      })
      .addCase(viewFiles.pending, (state) => {
        state.statusViewFiles = 'loading';
      })
      .addCase(viewFiles.fulfilled, (state, action) => {
        state.statusViewFiles = 'idle';
        state.view = action.payload;
      })
      .addCase(viewFiles.rejected, (state) => {
        state.statusViewFiles = 'failed';
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
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.statusUpload = 'idle';
        state.needUpdate = true;
      })
      .addCase(uploadFile.rejected, (state) => {
        state.statusUpload = 'failed';
        state.needUpdate = false;
      })

      .addCase(downloadFile.pending, (state) => {
        state.statusDownload = 'loading';
      })
      .addCase(downloadFile.fulfilled, (state) => {
        state.statusDownload = 'idle';
      })
      .addCase(downloadFile.rejected, (state) => {
        state.statusDownload = 'failed';
      })

      .addCase(deleteFile.pending, (state) => {
        state.needUpdate = false;
        state.statusDelete = 'loading';
      })
      .addCase(deleteFile.fulfilled, (state) => {
        state.needUpdate = true;
        state.statusDelete = 'idle';
      })
      .addCase(deleteFile.rejected, (state) => {
        state.needUpdate = false;
        state.statusDelete = 'failed';
      })

      .addCase(fetchRecentlyUploaded.pending, (state) => {
        state.needUpdate = true;
        state.statusFetchRecently = 'loading';
      })
      .addCase(fetchRecentlyUploaded.fulfilled, (state, action) => {
        state.statusFetchRecently = 'idle';
        state.needUpdate = false;
        state.dataRecently = action.payload;
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

// eslint-disable-next-line prettier/prettier
export const { selectedDir, pushToStack, popBreadcrumbsStack, clearBeadcrumbsStack, pushBreadcrumbsStack, dropState, popToStack, viewFolder } =
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
