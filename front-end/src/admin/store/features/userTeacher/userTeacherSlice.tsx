import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
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
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZV9pZCI6MSwiZW1haWwiOiJ0cnVvbmc0ODI2OUBkb25nYS5lZHUudm4iLCJpYXQiOjE2Nzg5NjAwNjcsImV4cCI6MTY4MTU1MjA2N30.PJAb3nal_a1woL1SMr-htlRIYg8gnYytxSV2-s4zuCY",
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   console.log(data, "data")

    //   return data;
    // } catch (err: any) {
    //   return rejectWithValue(err.response.data);
    // }


    try {
      const { data } = await userServices.getUserApi("ALL");
      return data;
    } catch (error: any) {
      console.log(error, 'err')
      return rejectWithValue(error.response.data);
    }

    // const data = await userServices.getUserApi("ALL");
    // if (data.response.status === 500) {
    //   return rejectWithValue(data.response.data);
    // }

    // if (data.response.data) {
    //   return data;
    // }

    // return data;
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
      console.log(action, 'action')
    },
  },
});

// Action creators are generated for each case reducer function
export const { getDataUserTeacher } = userTeacherSlice.actions;
// export const { getDataUserTeacherStart } = userTeacherSlice.actions

export default userTeacherSlice.reducer;
