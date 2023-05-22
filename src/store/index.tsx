import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { emptySplitApi } from "./Services";
import React from 'react';
import { createStore } from 'redux';
import { Provider, TypedUseSelectorHook,  useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './Slices/AddToCardSlice';
import productSlice from "./Slices/AddToCardSlice";






const persistConfig = {
  key: "role",
  storage,
};

const reducer = combineReducers({
  products: productSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

// Step 1: Set up your Redux store
const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    products: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

// Set up listeners for RTK Query
setupListeners(store.dispatch);



export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
