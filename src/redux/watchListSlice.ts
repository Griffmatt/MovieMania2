import { createSlice } from '@reduxjs/toolkit'

import { Imovie } from '../typescript/interfaces/movie'

interface State {
  watchLists: Imovie[]
}

const initialState: State = {
  watchLists: [],
}

export const watchListSlice = createSlice({
  name: 'watchList',
  initialState,
  reducers: {
    addMovie: (state, action: { payload: Imovie }) => {
      console.log(action.payload)
      state.watchLists = [...state.watchLists, action.payload]
    },
    removeMovie: (state, action: { payload: Imovie }) => {
      state.watchLists = state.watchLists.filter(
        (movie: Imovie) => movie.id !== action.payload.id
      )
    },
  },
})

export const { addMovie, removeMovie } = watchListSlice.actions

export const selectWatchList = (state: { watchLists: State }) =>
  state.watchLists.watchLists

export default watchListSlice.reducer
