import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface userTeacherState {
  dataUserTeacher: any;
  isLoading: Boolean;
  error: Boolean;
  messageError: any;
}

/* State */
const initialState: userTeacherState = {
  dataUserTeacher: [],
  isLoading: false,
  error: false,
  messageError: null,
};

/* Actions */
export const getDataUser: any = createAsyncThunk(
  "userTeacher/getDataUser",
  async (params, thunkAPI) => {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:8080/user/get?id=ALL",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZV9pZCI6MSwiZW1haWwiOiJ0aWVudHJhbmNudHRAZ21haWwuY29tIiwiaWF0IjoxNjc4OTAwNjA0LCJleHAiOjE2ODE0OTI2MDR9.FtfQ1WUcp28OFspCRsuEOt2J1oFL-YyQSzX0BUZ9Sug",
        "Content-Type": "application/json",
      },
    });

    return data;
  }
);

const userTeacherSlice = createSlice({
  name: "userTeacher",
  initialState: initialState,
  reducers: {
    getDataUserTeacher: (state, action: PayloadAction<userTeacherState[]>) => {
      // state.dataUserTeacher = action.payload;
    },
  },
  extraReducers: {
    [getDataUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getDataUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.messageError = action.error.message;
    },
    [getDataUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.dataUserTeacher = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getDataUserTeacher } = userTeacherSlice.actions;
// export const { getDataUserTeacherStart } = userTeacherSlice.actions

export default userTeacherSlice.reducer;
