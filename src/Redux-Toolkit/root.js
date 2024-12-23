import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products"
import searchSlice from "./search"
import cartSlice from "./cart"
const rootReducer = combineReducers({
   getProducts : productsSlice,
   search : searchSlice,
   cart : cartSlice
})
export default rootReducer