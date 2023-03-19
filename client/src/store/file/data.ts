import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { FileApi } from "../../api/FileApi";
import { FileCreateDTO, FileResponse } from "../../api/FileApi/models";
import { RequestStatus, UUID } from "../../utility/common";
import { RootState } from "../root";

import { statusFlags } from "../selectors";

type State = {
  file: FileResponse[] | [];
  currentDir: string;
  status: RequestStatus;
  statusCreate: RequestStatus;
};

const initialState: State = {
  file: [],
  currentDir: "",
  status: "idle",
  statusCreate: "idle",
};

const fetchFiles = createAsyncThunk(
  "file/fetch",
  async (dirId: UUID, { rejectWithValue }) => {
    try {
      const response = await FileApi.fetchFiles(dirId);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const createFile = createAsyncThunk(
  "file/create",
  async (payload: FileCreateDTO, { rejectWithValue }) => {
    try {
      const response = await FileApi.createFile(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const fileDataSlice = createSlice({
  name: "fileDataSlice",
  initialState,
  reducers: {
    dropState: () => initialState,
    selectedDir: (state, action: PayloadAction<string>) => {
      state.currentDir = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFiles.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(fetchFiles.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(createFile.pending, (state) => {
        state.statusCreate = "loading";
      })
      .addCase(createFile.fulfilled, (state) => {
        state.statusCreate = "idle";
      })
      .addCase(createFile.rejected, (state) => {
        state.statusCreate = "failed";
      });
  },
});

const selectSelf = (state: RootState) => state.file.data;

const getFilesData = createSelector(selectSelf, ({ ...fileData }) => fileData);
const statusCreate = createSelector(
  selectSelf,
  ({ statusCreate }) => statusCreate
);
const getCurrentDir = createSelector(
  selectSelf,
  ({ currentDir }) => currentDir
);
const getStatus = createSelector(selectSelf, statusFlags);

export const { selectedDir, dropState } = fileDataSlice.actions;

export {
  getFilesData,
  fetchFiles,
  getStatus,
  getCurrentDir,
  statusCreate,
  createFile,
};
export default fileDataSlice.reducer;
