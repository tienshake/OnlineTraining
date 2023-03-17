import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import reduxReducer from "../features/language/languageSlice";
import userTeeacherReducer  from '../../redux/features/userTeacher/userTeacherSlice';

export const store = configureStore({
  reducer: {
    lang: reduxReducer,
    userTeachers: userTeeacherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
