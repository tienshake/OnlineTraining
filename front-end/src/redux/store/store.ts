import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import reduxReducer from "../features/language/languageSlice";
import userTeacherReducer from "../../redux/features/userTeacher/userTeacherSlice";
import loadingReducer from "../../redux/features/loading/loadingSlice";
import searchReducer from "../../redux/features/search/searchSlice";
import authReducer from "../features/auth";
// import localStorageMiddleware from "../../middleware/auth";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import coursesFavoriteSlice from "../features/coursesFavorite/coursesFavoriteSlice";
import cartSlice from "../features/cart/cartSlice";

const persistCommonConfig = {
  storage: storage,
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "auth",
  whitelist: ["isAuthenticated", "user"] /*  cái này là cái muốn lấy */,
  stateReconciler: autoMergeLevel2,
};

/*  */
const favoriteCouresPersistConfig = {
  ...persistCommonConfig,
  key: "coursesFavorite",
  whitelist: ["listCoursesFavorite"],
  stateReconciler: autoMergeLevel2,
};

/* cart */
const cartPersistConfig = {
  ...persistCommonConfig,
  key: "cart",
  whitelist: ["listItemsCarts"],
  stateReconciler: autoMergeLevel2,
};

export const rootReducer = combineReducers({
  loading: loadingReducer,
  lang: reduxReducer,
  userTeachers: userTeacherReducer,
  useSearch: searchReducer,
  auth: persistReducer(userPersistConfig, authReducer),
  favoriteCoures: persistReducer(
    favoriteCouresPersistConfig,
    coursesFavoriteSlice
  ),
  cart: persistReducer(cartPersistConfig, cartSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(localStorageMiddleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
