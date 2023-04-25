import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { mapToOption, RequestStatus } from '@src/utility/common';

import {
  FileCreateDTO,
  FileResponse,
  FileUploadDTO,
  FileResponseRecently,
  FilePayloadDTO,
} from '@api/FileApi/models';
import { FileApi } from '@api/FileApi';

import { SelectOption } from '@components/Select/Select';

import { statusFlags } from '@store/selectors';
import { RootState } from '@store/root';

type State = {
  file: FileResponse[] | [];
  dataRecently: FileResponseRecently[];
  foldersPaths: SelectOption<string>[];
  needUpdate: boolean;
  searchableText?: string;
  currentDir?: string;
  breadCrumbsStack: any;
  status: RequestStatus;
  statusCreate: RequestStatus;
  statusUpload: RequestStatus;
  statusDownload: RequestStatus;
  statusDelete: RequestStatus;
  statusSearch: RequestStatus;
  statusViewFiles: RequestStatus;
  statusFetchRecently: RequestStatus;
  statusFoldersPath: RequestStatus;
  view: 'list' | 'plate';
};

const initialState: State = {
  file: [],
  dataRecently: [],
  foldersPaths: [],
  needUpdate: false,
  currentDir: '',
  breadCrumbsStack: [],
  status: 'idle',
  searchableText: '',
  statusCreate: 'idle',
  statusUpload: 'idle',
  statusDownload: 'idle',
  statusSearch: 'idle',
  statusViewFiles: 'idle',
  statusDelete: 'idle',
  statusFoldersPath: 'idle',
  statusFetchRecently: 'idle',
  view: 'list',
};

const fetchFiles = createAsyncThunk(
  'file/fetch',
  async (payload: FilePayloadDTO, { rejectWithValue }) => {
    try {
      const response = await FileApi.fetchFiles(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const fetchBreadCrumbs = createAsyncThunk(
  'file/breadscrumbs',
  async (currentId: string, { rejectWithValue }) => {
    try {
      const response = await FileApi.fetchBreadCrumbs(currentId);
      return response.data.reverse();
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

const searchFile = createAsyncThunk(
  'file/search',
  async (searchName: string, { rejectWithValue }) => {
    try {
      const response = await FileApi.searchFile(searchName);
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

const fetchFoldersPath = createAsyncThunk(
  'file/fetchFoldersPath',
  async (_, { rejectWithValue }) => {
    try {
      const response = await FileApi.fetchFoldersPaths();
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
    saveSearchText: (state, action: PayloadAction<string | undefined>) => {
      state.searchableText = action.payload;
    },
    viewFolder: (state, action: PayloadAction<'list' | 'plate'>) => {
      state.view = action.payload;
    },
    // pushBreadcrumbsStack: (state, action: PayloadAction<BreadCrumbStack>) => {
    //   state.breadCrumbsStack = [...state.breadCrumbsStack, action.payload];
    // },
    // popBreadcrumbsStack: (state, action: PayloadAction<any>) => {
    //   const spliced = [...state.breadCrumbsStack].splice(
    //     action.payload.index + 1,
    //     state.breadCrumbsStack.length - action.payload.index,
    //   );
    //   state.breadCrumbsStack =
    //     [...state.breadCrumbsStack].filter((x) => spliced.indexOf(x) === -1) || [];
    // },
    clearBeadcrumbsStack: (state) => {
      state.breadCrumbsStack = [];
      state.currentDir = '';
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
        state.needUpdate = false;
      })
      .addCase(fetchFiles.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(viewFiles.pending, (state) => {
        state.statusViewFiles = 'loading';
      })
      .addCase(viewFiles.fulfilled, (state, action) => {
        state.statusViewFiles = 'idle';
        state.needUpdate = true;
        state.view = action.payload;
      })
      .addCase(viewFiles.rejected, (state) => {
        state.statusViewFiles = 'failed';
      })
      .addCase(createFile.pending, (state) => {
        state.statusCreate = 'loading';
      })
      .addCase(createFile.fulfilled, (state) => {
        state.statusCreate = 'idle';
        state.needUpdate = true;
      })
      .addCase(createFile.rejected, (state) => {
        state.statusCreate = 'failed';
      })

      .addCase(uploadFile.pending, (state) => {
        state.statusUpload = 'loading';
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.statusUpload = 'idle';
        state.needUpdate = true;
        state.needUpdate = true;
      })
      .addCase(uploadFile.rejected, (state) => {
        state.statusUpload = 'failed';
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
        state.needUpdate = true;
      })
      .addCase(deleteFile.rejected, (state) => {
        state.needUpdate = false;
        state.statusDelete = 'failed';
      })
      .addCase(searchFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchFile.fulfilled, (state, action) => {
        state.file = action.payload;
        state.status = 'idle';
        state.needUpdate = false;
      })
      .addCase(searchFile.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchBreadCrumbs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBreadCrumbs.fulfilled, (state, action) => {
        state.breadCrumbsStack = action.payload;
        state.status = 'idle';
        state.needUpdate = false;
      })
      .addCase(fetchBreadCrumbs.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchRecentlyUploaded.pending, (state) => {
        state.statusFetchRecently = 'loading';
      })
      .addCase(fetchRecentlyUploaded.fulfilled, (state, action) => {
        state.statusFetchRecently = 'idle';
        state.needUpdate = true;
        state.dataRecently = action.payload;
      })
      .addCase(fetchRecentlyUploaded.rejected, (state) => {
        state.statusFetchRecently = 'failed';
      })

      .addCase(fetchFoldersPath.pending, (state) => {
        state.statusFoldersPath = 'loading';
      })
      .addCase(fetchFoldersPath.fulfilled, (state, action) => {
        state.statusFoldersPath = 'idle';
        state.foldersPaths = action.payload.map(({ path, _id }) => mapToOption(_id, path));
      })
      .addCase(fetchFoldersPath.rejected, (state) => {
        state.statusFoldersPath = 'failed';
      });
  },
});

const selectSelf = (state: RootState) => state.file.data;

const getFilesData = createSelector(selectSelf, ({ ...fileData }) => fileData);
const statusCreate = createSelector(selectSelf, ({ statusCreate }) => statusCreate);
const getCurrentDir = createSelector(selectSelf, ({ currentDir }) => currentDir);
const getStatus = createSelector(selectSelf, statusFlags);
const setViewFolders = createSelector(selectSelf, ({ ...view }) => view);
const getRecentlyUploaded = createSelector(selectSelf, ({ ...dataRecently }) => dataRecently);
const getFoldersPath = createSelector(selectSelf, ({ ...foldersPath }) => foldersPath);
const getSearchText = createSelector(selectSelf, ({ ...searchableText }) => searchableText);

// eslint-disable-next-line prettier/prettier
export const { selectedDir, saveSearchText, clearBeadcrumbsStack, dropState, viewFolder } =
  fileDataSlice.actions;

export {
  getFilesData,
  fetchFiles,
  getStatus,
  getCurrentDir,
  statusCreate,
  createFile,
  uploadFile,
  downloadFile,
  deleteFile,
  searchFile,
  setViewFolders,
  fetchRecentlyUploaded,
  getRecentlyUploaded,
  fetchFoldersPath,
  getFoldersPath,
  getSearchText,
  fetchBreadCrumbs,
};
export default fileDataSlice.reducer;
