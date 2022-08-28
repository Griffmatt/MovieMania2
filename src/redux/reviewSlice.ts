import { createSlice } from '@reduxjs/toolkit';

export const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: []
    },
    reducers: {
        addReview: (state, action) => {
            state.reviews = [...state.reviews, action.payload]
        },
        removeReview: (state, action) => {
            state.reviews = state.reviews.filter(review => review.title !== action.payload)
        }
    },
});

export const { addReview, removeReview } = reviewSlice.actions;

export const selectReview = state => state.reviews.reviews;

export default reviewSlice.reducer;