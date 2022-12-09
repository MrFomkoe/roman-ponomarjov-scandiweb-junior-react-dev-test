import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const url = 'http://localhost:4000/';

export const loadCurrencies = createAsyncThunk(
  'currencies/loadCurrencies',
  async () => {
    const query = gql`
      {
        currencies {
          label
          symbol
        }
      }
    `;

    const response = await request(url, query);
    return response;
  }
);

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    isLoading: true,
    hasError: false,
    currencies: null,
    currentCurrency: null,
    defaultCurrency: null,
    currencyChangerVisible: false,
  },
  reducers: {
    switchCurrency: (state, action) => {
      state.currentCurrency = action.payload;
    },
    showCurrencyChanger: (state, action) => {
      if (action.payload === false) {
        state.currencyChangerVisible = action.payload;
      } else {
        state.currencyChangerVisible = !state.currencyChangerVisible;
      }
    },
  },
  extraReducers: {
    [loadCurrencies.pending]: (state) => {
      state.isLoading = true;
    },
    [loadCurrencies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currencies = action.payload.currencies;
      state.defaultCurrency = action.payload.currencies[0];
    },
    [loadCurrencies.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const { switchCurrency, showCurrencyChanger } = currenciesSlice.actions;

export default currenciesSlice.reducer;
