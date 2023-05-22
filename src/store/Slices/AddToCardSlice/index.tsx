import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action:any) {
      state.products.push(action.payload);
    },
    removeProduct(state, action) {
      state.products = state.products.filter((product:any) => (product.id) !== action.payload);
    },
    // Add more cases for updating, deleting, or modifying products
  },
});