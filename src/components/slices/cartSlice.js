import { createSlice, current } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalSum: null,
    numOfProducts: null,
    showCartOverlay: false,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { cartItems } = state;
      const newItem = {
        ...action.payload,
        quantity: 1,
      };

      // Check if the item added to cart is already present
      const itemInCartAlready = cartItems.findIndex((item) => item.id === newItem.id);

      // If not - add item to cart. Else - increse quantity
      if (itemInCartAlready === -1) {
        cartItems.push(newItem);
      } else {
        const presentItem = cartItems.find((item) => item.id === newItem.id);
        presentItem.quantity += 1;
      }

      // Calculate total amount of product instances
      state.numOfProducts = cartItems.length;
    },
    removeItemFromCart: (state, action) => {},

    showCartOverlay: (state, action) => {
      state.showCartOverlay = !state.showCartOverlay;
    },
  },
});

export const { addItemToCart, removeItemFromCart, showCartOverlay } = cartSlice.actions;

export default cartSlice.reducer;
