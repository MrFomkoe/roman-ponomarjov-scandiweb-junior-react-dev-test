import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
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
            id,
            inStock,
            gallery,
            attributes {
              id,
              name,
              type,
              items {
                displayValue,
                id,
                value
              }
            },
            prices {
              currency {
                label,
                symbol,
              }
              amount,
            },
            brand
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
    products: null,
    isLoading: true,
    hasError: false,
  },


  extraReducers: {
    [loadCategoryProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [loadCategoryProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.category.products;
    },
    [loadCategoryProducts.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});


export default productsSlice.reducer;
