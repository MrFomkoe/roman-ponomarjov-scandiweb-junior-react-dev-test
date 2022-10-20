import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request, gql } from "graphql-request";

const url = "http://localhost:4000/";

export const loadCategories = createAsyncThunk(
  "categories/loadCategories",
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
  name: "categories",
  initialState: {
    isLoading: true,
    hasError: false,
    categories: null,
  },

  extraReducers: {
    [loadCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [loadCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.categories;
    },
    [loadCategories.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export default categoriesSlice.reducer;
