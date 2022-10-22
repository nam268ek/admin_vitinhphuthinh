import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../Slices/AuthSlice';
// import { primaryReducer } from '../Slices/PrimarySlice';
import { productReducer } from '../Slices/ProductSlice';
import { categoryReducer } from '../Slices/CategorySlice';
import { orderReducer } from '../Slices/OrderSlice';
import { layoutReducer } from '../Slices/LayoutSlice';
import { footerReducer } from '../Slices/FooterSlice';

const reducers = combineReducers({
  auth: authReducer,
  // primary: primaryReducer,
  product: productReducer,
  category: categoryReducer,
  order: orderReducer,
  layout: layoutReducer,
  footer: footerReducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
