import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { RequestStatus } from '../utility/common';
import user from './auth';
import file from './file';
import favorites from './favorites';

export const store = configureStore({
  reducer: {
    user,
    file,
    favorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

type StateWithStatus = {
  status: RequestStatus;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type { StateWithStatus };
