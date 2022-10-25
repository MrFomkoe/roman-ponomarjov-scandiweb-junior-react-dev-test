import { createSlice, current } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [
      {
        size: "Small",
        name: "Jacket",
        brand: "Canada Goose",
        id: "jacket-canada-goosee-small",
        quantity: 1,
      },
    ],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { size, name, brand, id } = action.payload;
      let newItem;
      // Check if the item with same attributes is already in cart
      state.cartItems.find((cartItem) => {
        if (cartItem.id === id) {
          cartItem.quantity = cartItem.quantity + 1;
        } else {
          newItem = {
            id: id,
            name: name,
            brand: brand,
            quantity: 1,
          };
        }
      });

      // console.log(action.payload);
    },
    removeItemFromCart: (state, action) => {},
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
