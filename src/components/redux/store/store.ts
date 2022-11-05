import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../Slices/AuthSlice';
import { brandReducer } from '../Slices/BrandSlice';
import { categoryReducer } from '../Slices/CategorySlice';
import { footerReducer } from '../Slices/FooterSlice';
import { imageReducer } from '../Slices/ImageSlice';
import { layoutReducer } from '../Slices/LayoutSlice';
import { orderReducer } from '../Slices/OrderSlice';
import { productReducer } from '../Slices/ProductSlice';
import { tagReducer } from '../Slices/TagSlice';

const reducers = combineReducers({
  auth: authReducer,
  tag: tagReducer,
  image: imageReducer,
  product: productReducer,
  category: categoryReducer,
  order: orderReducer,
  layout: layoutReducer,
  footer: footerReducer,
  brand: brandReducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
