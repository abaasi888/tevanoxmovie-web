import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trending: [],
  latest: [],
  selected: null,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setTrending: (state, action) => {
      state.trending = action.payload;
    },
    setLatest: (state, action) => {
      state.latest = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearSelected: (state) => {
      state.selected = null;
    },
  },
});

export const {
  setTrending,
  setLatest,
  setSelected,
  setLoading,
  setError,
  clearSelected,
} = movieSlice.actions;

export default movieSlice.reducer;