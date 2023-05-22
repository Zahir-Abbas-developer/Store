import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { emptySplitApi } from "./Services";
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './Slices/AddToCardSlice';
// Step 2: Define your reducers and actions
const cartReducer:any = (state = [], action:any) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter((item:any) => item.id !== action.payload);
    // Add more cases for updating quantities, etc.
    default:
      return state;
  }
};



const removeFromCart = (itemId:any) => ({
  type: 'REMOVE_FROM_CART',
  payload: itemId,
});

// Step 3: Configure Redux Persist
const persistConfig:any = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

// Step 1: Set up your Redux store
const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    cart: persistedReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

// Set up listeners for RTK Query
setupListeners(store.dispatch);

const exportedObject = {
  cartReducer,

  removeFromCart,
  store,
};

export default exportedObject;
