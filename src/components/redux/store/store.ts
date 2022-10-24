import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../Slices/AuthSlice';
import { categoryReducer } from '../Slices/CategorySlice';
import { footerReducer } from '../Slices/FooterSlice';
import { imageReducer } from '../Slices/ImageSlice';
import { layoutReducer } from '../Slices/LayoutSlice';
import { orderReducer } from '../Slices/OrderSlice';
import { productReducer } from '../Slices/ProductSlice';

const reducers = combineReducers({
  auth: authReducer,
  image: imageReducer,
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
