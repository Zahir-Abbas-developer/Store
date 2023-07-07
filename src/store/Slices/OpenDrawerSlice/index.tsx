// drawerSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isOpenGlobalSearchDrawer:false
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer(state) {
      state.isOpen = true;
    },
    closeDrawer(state) {
      state.isOpen = false;
    },
    openGlobalSearchDrawer(state){
      state.isOpenGlobalSearchDrawer = true;
    },
    closeGlobalSearchDrawer(state){
      state.isOpenGlobalSearchDrawer = false;
    }
  },
});

export const { openDrawer, closeDrawer,openGlobalSearchDrawer, closeGlobalSearchDrawer} = drawerSlice.actions;
export default drawerSlice;
