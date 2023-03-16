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
export const getDataUser: any = createAsyncThunk('userTeacher/getDataUser', async (params, { rejectWithValue }) => {

  try {
    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:8080/user/get?id=ALL',
      headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZV9pZCI6MSwiZW1haWwiOiJ0cnVvbmc0ODI2OUBkb25nYS5lZHUudm4iLCJpYXQiOjE2Nzg4NTQ5OTYsImV4cCI6MTY4MTQ0Njk5Nn0.ujBXNm_D0rcy1NI1GXI16yQ2mI0P4aKazahQQJRKFuU',
        "Content-Type": 'application/json'
      },
    });

    return data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
});

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
      state.messageError = action.payload.message;
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
