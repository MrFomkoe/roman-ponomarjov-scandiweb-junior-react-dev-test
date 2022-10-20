import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request, gql } from "graphql-request";

const url = "http://localhost:4000/";

export const loadCategoryProducts = createAsyncThunk(
  "products/loadCategoryProducts",
  async (category) => {
    const query = gql`
      {
        category(input: {title: "${category}"}) {
          products {
            name,
          }
        }
      }
    `;

    const response = await request(url, query);
    return response;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    defaultCategory: "all",
    isLoading: true,
    hasError: false,
    products: null,
  },
  extraReducers: {
    [loadCategoryProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [loadCategoryProducts.fulfilled]: (state, action) => {
      console.log(action)

      state.isLoading = false;
      state.products = action.payload;
    },
    [loadCategoryProducts.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
})

export default productsSlice.reducer;
