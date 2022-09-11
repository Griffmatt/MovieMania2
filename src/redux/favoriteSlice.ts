import { createSlice } from '@reduxjs/toolkit'

import { Imovie } from '../typescript/interfaces/movie'

interface State {
  favorites: Imovie[]
}

const initialState: State = {
  favorites: [],
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: { payload: Imovie }) => {
      state.favorites = [...state.favorites, action.payload]
    },
    removeFavorite: (state, action: { payload: Imovie }) => {
      state.favorites = state.favorites.filter(
        (movie: Imovie) => movie.title !== action.payload.title
      )
    },
  },
})

export const { addFavorite, removeFavorite } = favoriteSlice.actions

export const selectFavorite = (state: { favorites: State }) =>
  state.favorites.favorites

export default favoriteSlice.reducer
