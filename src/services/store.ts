import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import ingredientsReducer from './slices/ingredients-slice';
import feedsReducer from './slices/feeds-slice';
import orderReducer from './slices/order-slice';
import profileOrdersReducer from './slices/profileOrders-slice';
import burgerConstructorReducer from './slices/burgerConstructor-slice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = {
  auth: authReducer,
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  order: orderReducer,
  profileOrders: profileOrdersReducer,
  burgerConstructor: burgerConstructorReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
