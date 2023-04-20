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

  /*  */
  errorEditUserTeacher: Boolean,
  messageErrorEditTeacher: Boolean,
  messageSuccessEditTeacher: any,
}

/* State */
const initialState: userTeacherState = {
  dataUserTeacher: [],

  /* get All User */
  isLoading: false,
  error: false,
  messageError: null,


  /* add ALL user */
  errorAddUserTeacher: false,
  messageErrorAddTeacher: false,
  messageSuccessAddTeacher: null,

  /* edit User */
  errorEditUserTeacher: false,
  messageErrorEditTeacher: false,
  messageSuccessEditTeacher: null,
};

/* Actions */
export const getDataUser: any = createAsyncThunk("userTeacher/getDataUser",
  async ({ /* params, */ role }:any, { rejectWithValue }) => {
    try {
      const { data } = await userServices.getUserApi("ALL", role );
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

export const editUserById: any = createAsyncThunk("userTeacher/editlUserById",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await userServices.editUserApi(params);

      return response.data;
    } catch (error: any) {
      console.log(error, "cay")
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

    /* Add User  */
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
        isLoading: false,
        dataUserTeacher: action.payload,
      }
    },

    /*  */
    [editUserById.rejected]: (state, action) => {
      state.errorEditUserTeacher = false;
      state.messageSuccessEditTeacher = action.payload;
    },
    [editUserById.fulfilled]: (state, action) => {
      state.messageSuccessEditTeacher = action.payload;
      state.errorEditUserTeacher = false;
    },
    [editUserById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messageSuccessEditTeacher = action.payload;
      state.errorEditUserTeacher = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getDataUserTeacher } = userTeacherSlice.actions;
// export const { getDataUserTeacherStart } = userTeacherSlice.actions

export default userTeacherSlice.reducer;
