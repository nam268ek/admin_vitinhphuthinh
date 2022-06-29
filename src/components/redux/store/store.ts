import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoginSlice from '../Slices/LoginSlice';
import primarySlice from '../Slices/PrimarySlice';
import productSlice from '../Slices/productSlice';
import categorySlice from '../Slices/CategorySlice';
import orderSlice from '../Slices/orderSlice';
import layoutSlice from '../Slices/layoutSlice';

const reducers = combineReducers({
  login: LoginSlice,
  primary: primarySlice,
  product: productSlice,
  category: categorySlice,
  order: orderSlice,
  layout: layoutSlice,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
export type RootState = ReturnType<typeof store.getState>