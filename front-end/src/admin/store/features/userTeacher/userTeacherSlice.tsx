import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import userServices from "../../../../services/user";

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
  async (params, { rejectWithValue }) => {
    // try {
    //   const { data } = await axios({
    //     method: "get",
    //     url: "http://localhost:8080/user/get?id=ALL",
    //     headers: {
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZV9pZCI6MSwiZW1haWwiOiJ0aWVubkBnbWFpbC5jb20iLCJpYXQiOjE2Nzg5MDkxMjEsImV4cCI6MTY4MTUwMTEyMX0.P1WCkrn_4N0pr99_02crlcXmG7SQQnQgseY5F9z1TCY",
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   return data;
    // } catch (err: any) {
    //   return rejectWithValue(err.response.data);
    // }
    // const data: any = await userServices.getUserApi("ALL");
    // console.log("data", data.data);
    // if (data.response.status === 500) {
    //   return rejectWithValue(data.response.data);
    // }
    // return data.data;
    try {
      const { data } = await userServices.getUserApi("ALL");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
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
