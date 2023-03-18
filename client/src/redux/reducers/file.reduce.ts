import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { file, files } from "../actions/file.action";
import initialState from "../store/initialState";
import { TFIle } from "../types/TFile";
import { TFIles } from "../types/TFIles";

export const UserAllFilesReducer = createSlice({
  name: "UserAllFilesReducer",
  initialState: initialState.files,
  reducers: {},

  extraReducers: (builder: ActionReducerMapBuilder<TFIles>) => {
    builder.addCase(files.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      files.fulfilled,
      (state: TFIles, action: PayloadAction<any>) => {
        console.log("UserAllFilesReducer", action.payload);
        state.data = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(files.rejected, (state) => {
      state.loading = false;
    });
  },
});

// TODO скорее всего не нужно
export const UserFileReducer = createSlice({
  name: "UserFileReducer",
  initialState: initialState.file,
  reducers: {},

  extraReducers: (builder: ActionReducerMapBuilder<TFIle>) => {
    builder.addCase(file.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      file.fulfilled,
      (state: TFIle, action: PayloadAction<any>) => {
        console.log("UserFileReducer", action.payload);

        state.loading = false;
      }
    );
    builder.addCase(file.rejected, (state) => {
      state.loading = false;
    });
  },
});
