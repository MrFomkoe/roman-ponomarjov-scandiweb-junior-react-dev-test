import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../components/slices/categoriesSlice';
import productsReducer from '../components/slices/productsSlice';



export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
  },
});
