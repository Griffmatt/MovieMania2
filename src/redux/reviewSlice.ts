import { createSlice } from '@reduxjs/toolkit';

import {Ireview} from "../ts/interfaces/review"


interface State{
    reviews: Ireview[]
}

const initialState: State = {
    reviews: []
}

export const reviewSlice = createSlice({
    name: "reviews",
    initialState,
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

export const selectReview = (state: {reviews: State}) => state.reviews.reviews;

export default reviewSlice.reducer;