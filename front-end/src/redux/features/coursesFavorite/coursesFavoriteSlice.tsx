import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
 
// interface coursesFavorite {
//     listCoursesFavorite: object[]
// }


/* State */
const initialState: /* coursesFavorite */ any = {
    listCoursesFavorite: []
};

const coursesFavoriteSlice = createSlice({
    name: "coursesFavorite",
    initialState: initialState,
    reducers: {
        getListCoursesFavorite: (state, action: PayloadAction</* userTeacherState */[]>) => {
            // state.listCoursesFavorite = [];
        },

        addCourseFavorite: (state, action: any) => {
            state.listCoursesFavorite.push(action.payload);
        }
    },
});

export const { getListCoursesFavorite, addCourseFavorite } = coursesFavoriteSlice.actions;
export default coursesFavoriteSlice.reducer;
