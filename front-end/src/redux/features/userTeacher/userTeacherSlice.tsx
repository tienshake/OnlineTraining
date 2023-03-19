import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import userServices from "../../../services/user";

interface userTeacherState {
  dataUserTeacher: any;
  isLoading: Boolean;
  error: Boolean;
  messageError: any;

  /*  */
  errorAddUserTeacher: Boolean,
  messageErrorAddTeacher: Boolean,
  messageSuccessAddTeacher: any,
}

/* State */
const initialState: userTeacherState = {
  dataUserTeacher: [],

  /* get All */
  isLoading: false,
  error: false,
  messageError: null,

  /* get By Add */


  /* add ALL */
  errorAddUserTeacher: false,
  messageErrorAddTeacher: false,
  messageSuccessAddTeacher: null,
};

/* Actions */
export const getDataUser: any = createAsyncThunk("userTeacher/getDataUser",
  async (params: String, { rejectWithValue }) => {
    try {
      const { data } = await userServices.getUserApi("ALL");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addDataUser: any = createAsyncThunk("userTeacher/addDataUser",
  async (params: any, { rejectWithValue }) => {

    if (params.name === "AxiosError") {
      return rejectWithValue(params.response.data);
    } else {
      return params;
    }

    // console.log(params.response.data.message, "params");
    // console.log(params.name, "AxiosError");
    // return rejectWithValue(params.response.data);
  }
);

export const getDataDetailUser: any = createAsyncThunk("userTeacher/getDetailDataUser",
  async (params: String, { rejectWithValue }) => {
    try {
      const { data } = await userServices.getUserDetailApi(params);

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

      // if (action.payload.message) {
      state.messageError = action.payload.message;
      // } 
    },
    [getDataUser.fulfilled]: (state, action) => {
      return {
        ...state,
        // isLoading = false;
        // dataUserTeacher = action.payload;
        isLoading: false,
        dataUserTeacher: action.payload,
      }
    },

    /*  */
    [addDataUser.rejected]: (state, action) => {
      state.errorAddUserTeacher = true;
      state.messageErrorAddTeacher = action.payload;
    },
    [addDataUser.fulfilled]: (state, action) => {
      state.errorAddUserTeacher = false;
      state.messageSuccessAddTeacher = action.payload;
    },

    /*  */
    [getDataDetailUser.fulfilled]: (state, action) => {
      return {
        ...state,
        // isLoading = false;
        // dataUserTeacher = action.payload;
        isLoading: false,
        dataUserTeacher: action.payload,
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { getDataUserTeacher } = userTeacherSlice.actions;
// export const { getDataUserTeacherStart } = userTeacherSlice.actions

export default userTeacherSlice.reducer;
