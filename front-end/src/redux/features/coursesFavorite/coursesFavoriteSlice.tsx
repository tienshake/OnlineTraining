import { createSlice } from "@reduxjs/toolkit";


/* State */

const initialState: /* coursesFavorite */ any = {
    listCoursesFavorite: ["xx"]
};

const coursesFavoriteSlice = createSlice({
    name: "coursesFavorite",
    initialState: initialState,
    reducers: {

        addCourseFavorite: (state, action: any) => {
            const localSt: string | null = localStorage.getItem("persist:coursesFavorite");

            if (localSt) {
                const parse = JSON.parse(localSt);
                const listCoursesFavorite = parse.listCoursesFavorite;
                const listCoursesFavoriteParse = JSON.parse(listCoursesFavorite);
                const findItem = listCoursesFavoriteParse.filter((course: { idCourse: number; }) => course.idCourse === action.payload.idCourse);

                if (findItem.length > 0) { 
                    alert("You have add this product to the favorite item!")
                } else {
                   state.listCoursesFavorite.push(action.payload);
                    alert("Ok")
                }
            }
        },

        removeProduct: (state, action) => {
            state.listCoursesFavorite = state.listCoursesFavorite.filter((course: { idCourse: number; }) => course.idCourse !== action.payload);
        }
    },
});

export const { addCourseFavorite, removeProduct } = coursesFavoriteSlice.actions;
export default coursesFavoriteSlice.reducer;
