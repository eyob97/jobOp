import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './resumeSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
