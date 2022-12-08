import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const url = 'http://localhost:4000/';

export const loadCategories = createAsyncThunk(
  'categories/loadCategories',
  async () => {
    const query = gql`
      {
        categories {
          name
        }
      }
    `;

    const response = await request(url, query);
    return response;
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    isLoading: true,
    hasError: false,
    categories: null,
    currentCategory: null,
    defaultCategory: null,
  },
  reducers: {
    switchCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },

  extraReducers: {
    [loadCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [loadCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.categories;
      state.defaultCategory = action.payload.categories[0].name;
    },
    [loadCategories.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const { switchCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
