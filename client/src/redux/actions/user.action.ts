import { createAsyncThunk } from "@reduxjs/toolkit";
import R from "../resources/R";
import { customAxios } from "../../utility/customAxios";

import { PropsCreateUser } from "../../components/Registration/Registration";
import { PropsLoginUser } from "../../components/Auth/Auth";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: PropsLoginUser, { rejectWithValue }) => {
    try {
      const response = await customAxios.post(R.url.user.login, {
        email,
        password,
      });
      console.log("login", response.data);
      return response.data;
    } catch (error) {
      // logTheEvent('Error', 'fetchCities', error.response || error);
      console.log(error);
      return error;
    }
  }
);

export const registration = createAsyncThunk(
  "user/registration",
  async (
    { name, surname, email, password }: PropsCreateUser,
    { rejectWithValue }
  ) => {
    try {
      const response = await customAxios.post(R.url.user.registration, {
        name,
        surname,
        email,
        password,
      });
      console.log("registration", response.data);
      return response.data;
    } catch (error) {
      // logTheEvent('Error', 'fetchCities', error.response || error);
      console.log(error);
      return error;
    }
  }
);

// TODO доработать
// export const auth = createAsyncThunk("user/auth", async () => {
//   try {
//     const response = await customAxios.get(R.url.user.auth, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       }
//     });
//     console.log("auth", response.data);
//     return response.data;
//   } catch (error) {
//     // logTheEvent('Error', 'fetchCities', error.response || error);
//     console.log(error);
//     localStorage.removeItem("token")
//     return error;
//   }
// });
