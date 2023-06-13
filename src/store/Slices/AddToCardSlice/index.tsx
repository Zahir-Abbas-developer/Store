import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action:any) {
      const newItem = action.payload;
      const existingItem = state?.products?.find((item:any) => item?.id === newItem?.id && item?.size === newItem?.size);
      if (existingItem) {
        existingItem.quantity += 1; // Increase the quantity of the existing item
      } else {
        state?.products?.push({ ...newItem, quantity: 1 }); // Add a new item with quantity 1
      }

    },
    removeProduct(state, action) {
     
      
      return { ...state, products: action.payload };
    },
    // Add more cases for updating, deleting, or modifying products
  },
});
export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice;
