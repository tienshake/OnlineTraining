import { EN, VI } from "../../../constants/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageState, PayloadType } from "../../../types";
const localStorageLang = localStorage.getItem("language");

const checkLanguage = localStorageLang === EN || localStorageLang === VI;

const initialState: LanguageState = {
  language: checkLanguage ? localStorageLang : EN,
};

export const LanguageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (
      state: LanguageState,
      action: PayloadAction<PayloadType>
    ) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    },
  },
});

export const { changeLanguage } = LanguageSlice.actions;

export default LanguageSlice.reducer;
