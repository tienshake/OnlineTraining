import { createSlice } from "@reduxjs/toolkit";


/* State */
const initialState: any = {
    listItemsCarts: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action: any) => {
            const findItem = state.listItemsCarts.filter((course: { idCourse: number; }) => course.idCourse === action.payload.idCourse);

            if (findItem.length > 0) {
                alert("You have added this product to your cart!")
            } else {
                state.listItemsCarts.push(action.payload);
            }
        },

        removeCart: (state, action) => {
            state.listItemsCarts = state.listItemsCarts.filter((course: { idCourse: number; }) => course.idCourse !== action.payload);
        }
    },
});

export const { addToCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
