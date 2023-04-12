import { createSlice } from "@reduxjs/toolkit";


/* State */

const initialState: /* coursesFavorite */ any = {
    listCoursesFavorite: []
};

const coursesFavoriteSlice = createSlice({
    name: "coursesFavorite",
    initialState: initialState,
    reducers: {
        addCourseFavorite: (state, action: any) => {
            const findItem = state.listCoursesFavorite.filter((course: { idCourse: number; }) => course.idCourse === action.payload.idCourse);

            if (findItem.length > 0) {
                alert("You have added this product to the favorite item!")
            } else {
                state.listCoursesFavorite.push(action.payload);
            }
        },

        removeProduct: (state, action) => {
            state.listCoursesFavorite = state.listCoursesFavorite.filter((course: { idCourse: number; }) => course.idCourse !== action.payload);
        }
    },
});

export const { addCourseFavorite, removeProduct } = coursesFavoriteSlice.actions;
export default coursesFavoriteSlice.reducer;
