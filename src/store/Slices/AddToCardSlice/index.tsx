import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
  products: [],
  isOpen:true
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action:any) {
      console.log(action.payload)
      state.products.push(action.payload);
    },
    removeProduct(state, action) {
      const updatedProducts = state.products.filter((product:any) => (product.id) !== action.payload);
      return { ...state, products: updatedProducts };
    },
    // Add more cases for updating, deleting, or modifying products
  },
});
export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice;
