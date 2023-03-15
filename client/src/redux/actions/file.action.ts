import { createAsyncThunk } from "@reduxjs/toolkit";
import R from "../resources/R";
import { customAxios } from "../../utility/customAxios";

export const files = createAsyncThunk("user/files", async (dirId?: string) => {
  try {
    const response = await customAxios.get(
      `${R.url.user.files}${dirId ? "?parent=" + dirId : ""}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("files", response.data);
    return response.data;
  } catch (error) {
    // logTheEvent('Error', 'fetchCities', error.response || error);
    console.log(error);
    return error;
  }
});

// TODO скорее всего не нужно
export const file = createAsyncThunk(
  "user/file",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(`${R.url.user.files}?parent=`);
      console.log("file", response.data);
      return response.data;
    } catch (error) {
      // logTheEvent('Error', 'fetchCities', error.response || error);
      console.log(error);
      return error;
    }
  }
);
