import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { ingredientsReducer } from '../slices/ingredientsSlice';
import { orderReducer } from '../slices/orderSlice';
import { ordersFeedReducer } from '../slices/feedSlice';
import { userReducer } from '../slices/userSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ordersFeed: ordersFeedReducer,
  user: userReducer,
  order: orderReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
