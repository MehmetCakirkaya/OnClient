import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import customerSlice from './slices/customerSlice';
import subscriptionSlice from './slices/subscriptionSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    customers: customerSlice,
    subscription: subscriptionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 