import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// interface coursesFavorite {
//     listCoursesFavorite: object[]
// }


// export const getDataDetailUser: any = createAsyncThunk("userTeacher/getDetailDataUser",
//   async (params: String, { rejectWithValue }) => {
//     try {
//       const { data } = await userServices.getUserDetailApi(params);

//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

/* State */

const myValue = localStorage.getItem("persist:coursesFavorite");

const initialState: /* coursesFavorite */ any = {
    listCoursesFavorite: ["xx"]
};

const coursesFavoriteSlice = createSlice({
    name: "coursesFavorite",
    initialState: initialState,
    reducers: {
        // getListCoursesFavorite: (state, action: PayloadAction</* userTeacherState */[]>) => {
        //     // state.listCoursesFavorite = [];
        // },

        addCourseFavorite: (state, action: any) => {
            state.listCoursesFavorite.push(action.payload);
        },

        removeProduct: (state, action) => {
            state.listCoursesFavorite = state.listCoursesFavorite.filter((course: { idCourse: any; }) => course.idCourse !== action.payload);

        }
    },
});

export const { addCourseFavorite, removeProduct } = coursesFavoriteSlice.actions;
export default coursesFavoriteSlice.reducer;
