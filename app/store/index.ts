import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import newsReducer from './slices/newsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;