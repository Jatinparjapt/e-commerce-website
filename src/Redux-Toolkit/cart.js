import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

const cartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    getCartItems: (state) => {
      const cart = localStorage.getItem("cart");
      state.cartItems = cart ? JSON.parse(cart) : [];
    },
    setCartItems: (state, action) => {
      const newItem = action.payload;
      // console.log(newItem)
      // Check if item with the same id already exists in cartItems
      const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex !== -1) {
        // Item with same id found, update quantity or take other action
        // For example, increase quantity:
        state.cartItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Item with id not found, add it to cartItems
        state.cartItems.push(newItem);
      }

      // Update localStorage with the updated cartItems array
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { getCartItems, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
