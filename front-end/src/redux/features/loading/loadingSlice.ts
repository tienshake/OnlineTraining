import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingTye {
  isLoading: any;
}

const initialState: LoadingTye = {
  isLoading: false,
};

export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    changeLoading: (state: LoadingTye, action: PayloadAction<LoadingTye>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeLoading } = LoadingSlice.actions;

export default LoadingSlice.reducer;
