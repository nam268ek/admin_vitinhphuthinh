import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoginSlice from '../Slices/LoginSlice';
import primarySlice from '../Slices/PrimarySlice';
import productSlice from '../Slices/productSlice';
import categorySlice from '../Slices/CategorySlice';
import orderSlice from '../Slices/orderSlice';
import layoutSlice from '../Slices/layoutSlice';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const reducers = combineReducers({
  login: LoginSlice,
  primary: primarySlice,
  product: productSlice,
  category: categorySlice,
  order: orderSlice,
  layout: layoutSlice,
});

// const store = configureStore({
//   reducer: reducers,
// });

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['primary', 'category', 'layout', 'order', 'product'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // ignoredActions: [],
      },
    }),
});


export default store;
export type RootState = ReturnType<typeof store.getState>