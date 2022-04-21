import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoginSlice from '../Slices/LoginSlice';
import primarySlice from '../Slices/PrimarySlice';

const reducers = combineReducers({
  login: LoginSlice,
  primary: primarySlice,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
export type RootState = ReturnType<typeof store.getState>