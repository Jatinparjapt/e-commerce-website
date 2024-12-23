import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  isLoading: false,
  proudctDetails: null,
};
// fetch details for single proudcts from fakestoreapi
export const getProductById = createAsyncThunk(
  "getSingleProductDetails",
  async (id) => {
    try {
      const options = {
        method: "GET",
        url: `https://fakestoreapi.com/products/${id}`,
      };
      const productDetails = await axios(options);
      //   console.log(productsData , "reducer")
      return productDetails.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
  try {
    const options = {
      method: "GET",
      url: "https://fakestoreapi.com/products",
    };
    const productsData = await axios(options);
    //   console.log(productsData , "reducer")
    return productsData.data;
  } catch (error) {
    console.error(error);
  }
});
const proudctsSlice = createSlice({
  name: "MyProductsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
        // Cases for getAllProducts
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
        })
        .addCase(getAllProducts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllProducts.rejected, (state) => {
            state.isLoading = false;
        })
        // Cases for getProductById
        .addCase(getProductById.fulfilled, (state, action) => {
            state.productDetails = action.payload;
            state.isLoading = false;
        })
        .addCase(getProductById.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProductById.rejected, (state) => {
            state.isLoading = false;
        })
    }
});

export default proudctsSlice.reducer;
