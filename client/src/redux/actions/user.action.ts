import { createAsyncThunk } from "@reduxjs/toolkit";
import R from "../resources/R";
import { customAxios } from "../../utility/customAxios";

export const registration = createAsyncThunk(
  "user/registration",
  async ({ email, password }: any, { rejectWithValue }) => {
    try {
      const response = await customAxios.post(R.url.user.registration, {
        email,
        password,
      });
      console.log("registration", response.data);
      return response.data;
    } catch (error) {
      // logTheEvent('Error', 'fetchCities', error.response || error);
      console.log(error);
      return null;
    }
  }
);
