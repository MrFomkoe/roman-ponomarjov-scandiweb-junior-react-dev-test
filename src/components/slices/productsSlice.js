import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const url = 'http://localhost:4000/';

export const loadCategoryProducts = createAsyncThunk(
  'products/loadCategoryProducts',
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

export const loadSingleProduct = createAsyncThunk(
  'products/loadSingleProduct',
  async (productId) => {
    const query = gql`
      {
        product(id: "${productId}") {
          id,
          name,
          inStock,
          gallery,
          attributes {
            id,
            name,
            type,
            items {
              displayValue,
              id,
              value,
            }
          }
          prices {
            currency {
              label,
              symbol,
            }
            amount,
          }
          brand,
          description,
        }
      }
    `;
    const response = await request(url, query);

    return response;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: null,
    singleProduct: null,
    singleProductLoading: true,
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

    [loadSingleProduct.pending]: (state) => {
      state.singleProductLoading = true;
    },
    [loadSingleProduct.fulfilled]: (state, action) => {
      state.singleProductLoading = false;
      state.singleProduct = action.payload.product;
    },
    [loadSingleProduct.rejected]: (state) => {
      state.singleProductLoading = false;
      state.hasError = true;
    },
  },
});

export default productsSlice.reducer;
