import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import initialState from "../store/initialState";
import { TUser } from "../types/TUser";
import { login } from "../actions/user.action";

export const UserLoginReducer = createSlice({
  name: "UserLoginReducer",
  initialState: initialState.user,
  reducers: {
    dropState: () => initialState.user,
  },

  extraReducers: (builder: ActionReducerMapBuilder<TUser>) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      login.fulfilled,
      (state: TUser, action: PayloadAction<any>) => {
        console.log("UserLoginReducer", action.payload);
        state.id = action.payload?.user.id;
        state.email = action.payload?.user.email;
        state.diskSpace = action.payload?.user.diskSpace;
        state.usedSpace = action.payload?.user.usedSpace;
        state.isAuth = true;
        state.loading = false;
      }
    );
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
  },
});

// TODO доработать
// export const UserAuthReducer = createSlice({
//   name: "UserAuthReducer",
//   initialState: initialState.user,
//   reducers: {
//     dropState: () => initialState.user,
//   },

//   extraReducers: (builder: ActionReducerMapBuilder<TUser>) => {
//     builder.addCase(auth.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(
//       auth.fulfilled,
//       (state: TUser, action: PayloadAction<any>) => {
//         console.log("UserAuthReducer", action.payload);
//         state.id = action.payload?.user.id;
//         state.email = action.payload?.user.email;
//         state.diskSpace = action.payload?.user.diskSpace;
//         state.usedSpace = action.payload?.user.usedSpace;
//         state.isAuth = true;
//         state.loading = false;
//       }
//     );
//     builder.addCase(auth.rejected, (state) => {
//       state.loading = false;
//     });
//   },
// });

export const { dropState } = UserLoginReducer.actions;
