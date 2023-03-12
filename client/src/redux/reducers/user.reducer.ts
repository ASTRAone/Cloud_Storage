import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import initialState from "../store/initialState";
import { TUser } from "../types/TUser";
import { registration } from "../actions/user.action";

export const UserRegistrationReducer = createSlice({
  name: "UserRegistrationReducer",
  initialState: initialState.user,
  reducers: {},

  extraReducers: (builder: ActionReducerMapBuilder<TUser>) => {
    builder.addCase(registration.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      registration.fulfilled,
      (state: TUser, action: PayloadAction<any>) => {
        console.log("UserRegistrationReducer", action.payload);
        // Добавить все поля
        state.id = action.payload.data;
        state.loading = false;
      }
    );
    builder.addCase(registration.rejected, (state) => {
      state.loading = false;
    });
  },
});
