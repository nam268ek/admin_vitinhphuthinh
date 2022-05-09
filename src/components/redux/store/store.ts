import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoginSlice from '../Slices/LoginSlice';
import primarySlice from '../Slices/PrimarySlice';
import productSlice from '../Slices/productSlice';
import categorySlice from '../Slices/CategorySlice';

const reducers = combineReducers({
  login: LoginSlice,
  primary: primarySlice,
  product: productSlice,
  category: categorySlice,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
export type RootState = ReturnType<typeof store.getState>