import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FolderView, RequestStatus } from '@src/utility/common';

import { FileResponse, FilePayloadDTO } from '@api/FileApi/models';
import { FileApi } from '@api/FileApi';

import { StorageService } from '@services/StorageService';

import { RootState } from '@store/root';

// TODO сделать стор для userSetting и вынести настройки туда

type State = {
  favoritesData: FileResponse[] | [];
  needUpdate: boolean;
  searchableText?: string;
  currentDir?: string;
  breadCrumbsStack: any;
  status: RequestStatus;
  view: FolderView;
};

const storageService = StorageService.getInstance();

const folderVariant: FolderView = storageService.getItem('viewFolderFavorites') ?? 'list';

const initialState: State = {
  favoritesData: [],
  needUpdate: false,
  currentDir: '',
  breadCrumbsStack: [],
  status: 'idle',
  searchableText: '',
  view: folderVariant,
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

const favoritesDataSlice = createSlice({
  name: 'favoritesDataSlice',
  initialState,
  reducers: {
    dropState: () => initialState,
    selectedDir: (state, action: PayloadAction<string | undefined>) => {
      state.currentDir = action.payload;
    },
    saveSearchText: (state, action: PayloadAction<string | undefined>) => {
      state.searchableText = action.payload;
    },
    viewFolder: (state, action: PayloadAction<FolderView>) => {
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
        state.status = 'idle';
        state.favoritesData = action.payload;
        state.needUpdate = false;
      })
      .addCase(fetchFiles.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

const selectSelf = (state: RootState) => state.favorites.data;

const getFilesData = createSelector(selectSelf, ({ ...fileData }) => fileData);

// eslint-disable-next-line prettier/prettier
export const { selectedDir, saveSearchText, clearBeadcrumbsStack, dropState, viewFolder } =
  favoritesDataSlice.actions;

export { getFilesData };
export default favoritesDataSlice.reducer;
