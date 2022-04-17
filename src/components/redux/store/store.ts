import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoginSlice from '../Slices/LoginSlice';

const reducers = combineReducers({
  login: LoginSlice,
});

export default configureStore({
  reducer: reducers,
});
