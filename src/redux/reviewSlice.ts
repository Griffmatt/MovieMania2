import { createSlice } from '@reduxjs/toolkit'

import { Ireview } from '../typescript/interfaces/review'

interface State {
  reviews: Ireview[]
}

const initialState: State = {
  reviews: [],
}

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action: { payload: Ireview }) => {
      state.reviews = [...state.reviews, action.payload]
    },
    removeReview: (state, action: { payload: string }) => {
      state.reviews = state.reviews.filter(
        (review) => review.title !== action.payload
      )
    },
    updateReview: (
      state,
      action: { payload: { review: string; rating: number; id: string } }
    ) => {
      state.reviews = state.reviews.map((review) => {
        if (action.payload.id === review.id) {
          return {
            ...review,
            rating: action.payload.rating,
            review: action.payload.review,
          }
        }
        return review
      })
    },
  },
})

export const { addReview, removeReview, updateReview } = reviewSlice.actions

export const selectReview = (state: { reviews: State }) => state.reviews.reviews

export default reviewSlice.reducer
