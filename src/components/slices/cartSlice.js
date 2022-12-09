import { createSlice, current } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalSum: null,
    numOfProducts: null,
    cartOverlayVisible: false,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { cartItems } = state;
      const newItem = {
        ...action.payload,
        quantity: 1,
      };

      // Check if the item added to cart is already present
      const itemInCartAlready = cartItems.findIndex(
        (item) => item.id === newItem.id
      );

      // If not - add item to cart. Else - increse quantity
      if (itemInCartAlready === -1) {
        cartItems.push(newItem);
      } else {
        const presentItem = cartItems.find((item) => item.id === newItem.id);
        presentItem.quantity += 1;
      }
      state.numOfProducts += 1;
    },

    showCartOverlay: (state, action) => {
      console.log(action.payload);
      if (action.payload === false) {
        state.cartOverlayVisible = action.payload;
      } else {
        state.cartOverlayVisible = !state.cartOverlayVisible;
      }
    },

    increaseAmount: (state, action) => {
      const inItem = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === inItem);
      cartItem.quantity += 1;
      state.numOfProducts += 1;
    },

    decreaseAmount: (state, action) => {
      const inItem = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === inItem);

      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        const newItemList = state.cartItems.filter(
          (item) => item.id !== cartItem.id
        );
        state.cartItems = newItemList;
      }
      state.numOfProducts -= 1;
    },

    calculateTotalSum: (state, action) => {
      const itemSumArr = state.cartItems.map((item) => {
        console.log(current(item));
        const itemPrice = item.prices.find(
          (price) => price.currency.label === action.payload.label
        ).amount;
        const sumForItem = item.quantity * itemPrice;
        return parseFloat(sumForItem.toFixed(2));
      });
      const totalSum =
        itemSumArr.length > 0
          ? itemSumArr.reduce((acc, value) => {
              return acc + value;
            })
          : 0;

      state.totalSum = parseFloat(totalSum.toFixed(2));
    },
  },
});

export const {
  addItemToCart,
  showCartOverlay,
  increaseAmount,
  decreaseAmount,
  calculateTotalSum,
} = cartSlice.actions;

export default cartSlice.reducer;
