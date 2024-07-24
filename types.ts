import { RootState } from '@/app/redux/store';
import { ThunkAction } from '@reduxjs/toolkit';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>;
