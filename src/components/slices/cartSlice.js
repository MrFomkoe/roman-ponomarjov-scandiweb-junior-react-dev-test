import { createSlice, current } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalSum: null,
    numOfProducts: null,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { cartItems } = state;
      const { attributes, name, brand, id, initialId } = action.payload;

      let newItem = {
        initialId: initialId,
        id: id,
        name: name,
        brand: brand,
        attributes: attributes,
        quantity: 1,
      };

      // Check if the item added to cart is already present
      const itemInCartAlready = cartItems.findIndex((item) => item.id === id);

      // If not - add item to cart. Else - increse quantity
      if (itemInCartAlready === -1) {
        cartItems.push(newItem);
      } else {
        const presentItem = cartItems.find((item) => item.id === id);
        presentItem.quantity += 1;
      }

      // Calculate total amount of product instances
      state.numOfProducts = cartItems.length;

    },
    removeItemFromCart: (state, action) => {},
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
