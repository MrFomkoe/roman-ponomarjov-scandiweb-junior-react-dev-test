import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request, gql } from "graphql-request";

const url = "http://localhost:4000/";

export const loadCategoryProducts = createAsyncThunk(
  "products/loadCategoryProducts",
  async (category) => {
    console.log(category);
    const query = gql`
      {
        category(input: {title: "${category}"}) {
          products {
            name,
            id,
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
    currentCategory: null,
    products: null,
    isLoading: true,
    hasError: false,
  },
  reducers: {
    switchCategory: (state, action) => {
      state.currentCategory = action.payload;
    }
  },

  extraReducers: {
    [loadCategoryProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [loadCategoryProducts.fulfilled]: (state, action) => {
      

      state.isLoading = false;
      state.products = action.payload.category.products;
      console.log(action.payload.category.products)
    },
    [loadCategoryProducts.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
})

export const { switchCategory } = productsSlice.actions;

export default productsSlice.reducer;
