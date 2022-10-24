import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'

import categoriesReducer from "../components/slices/categoriesSlice";
import currenciesReducer from "../components/slices/currencySlice";
import productsReducer from "../components/slices/productsSlice";


const persistConfig = {
  key: "root",
  storage: storageSession,
  blaclist: ["products"],
};

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  currencies: currenciesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store);
export default store;
