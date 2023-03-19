import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import searchServices from "../../../services/search";

interface searchType {
  dataSearch: any;
  isLoading: Boolean;
  error: Boolean;
  messageError: any;
}

/* State */
const initialState: searchType = {
  dataSearch: [],
  isLoading: false,
  error: false,
  messageError: null,
};

export interface paramsType {
  text: string;
  path: string;
}

/* Actions */
export const getDataSearch: any = createAsyncThunk(
  "search/getDataSearch",
  async (params: paramsType, { rejectWithValue }) => {
    try {
      const { data } = await searchServices.getSearchApi(params);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    getSearchData: (state, action: PayloadAction<searchType[]>) => {
      // state.dataUserTeacher = action.payload;
    },
  },
  extraReducers: {
    [getDataSearch.pending]: (state) => {
      state.isLoading = true;
    },
    [getDataSearch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.messageError = action.payload.message;
    },
    [getDataSearch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.dataSearch = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSearchData } = searchSlice.actions;
// export const { getDataUserTeacherStart } = userTeacherSlice.actions

export default searchSlice.reducer;
