import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './resumeSlice';
import authReducer from './authSlice';
import jobsReducer from './jobSlice';
import letterReducer from './letterSlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    auth: authReducer,
    jobs: jobsReducer,
    letters: letterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
