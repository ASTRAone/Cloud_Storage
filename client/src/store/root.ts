import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../utility/common';
import user from './auth';
// import resources from '@store/resources';

export const store = configureStore({
  reducer: {
    user,
    // resources,

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
