import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

import watchListSlice from './watchListSlice'
import reviewSlice from './reviewSlice'

const reducers = combineReducers({
  watchLists: watchListSlice,
  reviews: reviewSlice,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export default store
