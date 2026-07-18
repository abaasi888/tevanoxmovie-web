import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import movieSlice from './movieSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    movies: movieSlice,
  },
});