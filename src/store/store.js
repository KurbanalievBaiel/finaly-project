import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice'
import destinationsReducer from './slices/destinationsSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    destinations: destinationsReducer,
    auth: authReducer,
  },
})

